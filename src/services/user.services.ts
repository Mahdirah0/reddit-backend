import { Arg, Ctx } from 'type-graphql';
import { Context } from '../context';
import bcrypt from 'bcrypt';

class UserServices {
  async getAllUsers(@Ctx() { prisma }: Context) {
    return prisma.user.findMany();
  }

  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { prisma }: Context
  ) {
    try {
      const user = await prisma.user.findFirst({
        where: { email: email },
      });

      if (!user) {
        return {
          message: 'error',
          error: {
            field: 'email',
            message: 'no email found',
          },
        };
      }

      const matchingPassword = bcrypt.compareSync(password, user.password);

      if (matchingPassword) {
        return {
          message: 'logged in',
          user,
        };
      } else {
        return {
          message: 'error',
          error: {
            field: 'password',
            message: 'password do not match',
          },
        };
      }
    } catch (error) {
      return {
        message: 'error',
        error: {
          field: 'error',
          message: error,
        },
      };
    }
  }

  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { prisma }: Context
  ) {
    const foundEmail = await prisma.user.findFirst({
      where: { email: email },
    });

    if (foundEmail) {
      return {
        message: 'error',
        error: {
          field: 'email',
          message: 'email already in use',
        },
      };
    }

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return {
        message: 'created user',
        user: user,
      };
    } catch (err) {
      return err;
    }
  }
}

export default UserServices;

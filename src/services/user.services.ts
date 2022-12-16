import { Arg, Ctx } from 'type-graphql';
import { Context } from '../context';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server';
import { User } from '../objectTypes';

class UserServices {
  async getAllUsers(@Ctx() { prisma }: Context) {
    return prisma.user.findMany();
  }

  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { prisma }: Context
  ) {
    const errorMessage = 'Invalid email or password';
    try {
      const user = await prisma.user.findFirst({
        where: { email: email },
      });

      if (!user) {
        throw new ApolloError(errorMessage);
      }

      const matchingPassword = bcrypt.compareSync(password, user.password);

      if (matchingPassword) {
        const clone = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        const token = jwt.sign({ user: clone }, process.env.SECRET_KEY!, {
          expiresIn: '2h',
        });
        return {
          message: 'logged in',
          user,
          token,
        };
      } else {
        throw new ApolloError(errorMessage);
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
        user,
      };
    } catch (err) {
      return err;
    }
  }
}

export default UserServices;

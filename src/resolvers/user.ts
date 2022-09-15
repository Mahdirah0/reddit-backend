import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../context';
import bcrypt from 'bcrypt';
import { error } from 'console';
import { User, ResponseMessage } from '../objectTypes';

@Resolver(ResponseMessage)
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { prisma }: Context) {
    return prisma.user.findMany();
  }

  @Query(() => ResponseMessage)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { prisma }: Context
  ) {
    try {
      const emailExist = await prisma.user.findFirst({
        where: { email: email },
      });

      if (!emailExist) {
        return {
          message: 'error',
          error: {
            field: 'email',
            message: 'no email found',
          },
        };
      }

      const matchingPassword = bcrypt.compareSync(
        password,
        emailExist.password
      );

      if (matchingPassword) {
        return {
          message: 'logged in',
          user: User,
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
      return error;
    }
  }

  @Mutation(() => ResponseMessage)
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
      return error;
    }
  }
}

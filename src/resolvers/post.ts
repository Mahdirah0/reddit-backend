import { Arg, Query, Resolver, Ctx, Mutation } from 'type-graphql';
import { Context } from '../context';
import { Post, ResponseMessage } from '../objectTypes';

@Resolver(ResponseMessage)
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() { prisma }: Context) {
    return await prisma.post.findMany();
  }

  @Query(() => ResponseMessage)
  async getPost(@Arg('id') id: string, @Ctx() { prisma }: Context) {
    try {
      const findPost = await prisma.post.findFirst({ where: { id: id } });

      if (!findPost) {
        return {
          message: 'error',
          error: {
            field: 'post',
            message: 'post not found',
          },
        };
      }

      return {
        message: 'found post',
        post: findPost,
      };
    } catch (error) {
      return {
        message: 'error',
        error: {
          field: 'catch',
          message: error,
        },
      };
    }
  }

  @Mutation(() => ResponseMessage)
  async createPost(
    @Arg('id') id: string,
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Ctx() { prisma }: Context
  ) {
    try {
      const post = await prisma.post.create({
        data: {
          title,
          description,
          userId: id,
        },
      });

      return {
        message: 'created post',
        post,
      };
    } catch (error) {
      return {
        message: 'error',
        error: {
          field: 'catch',
          message: error,
        },
      };
    }
  }
}

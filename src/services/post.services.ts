import { Arg, Ctx } from 'type-graphql';
import { Context } from '../context';

class PostServices {
  async getAllPosts(@Ctx() { prisma }: Context) {
    return await prisma.post.findMany();
  }

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
        message: 'post found',
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

  async createPost(
    @Arg('userId') userId: string,
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Ctx() { prisma }: Context
  ) {
    try {
      const post = await prisma.post.create({
        data: {
          title,
          description,
          userId,
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

  async editPost(@Arg('postId') postId: string, @Ctx() { prisma }: Context) {
    return '';
  }
}

export default PostServices;

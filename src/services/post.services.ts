import { GraphQLError } from 'graphql';
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

  async getUserPosts(
    @Arg('userId') userId: string,
    @Ctx() { prisma }: Context
  ) {
    const posts = await prisma.post.findMany({
      where: { userId: userId },
    });

    return posts;
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

  async editPost(
    @Arg('userId') userId: string,
    @Arg('postId') postId: string,
    @Arg('title') title: string,
    @Arg('comment') description: string,
    @Ctx() { prisma }: Context
  ) {
    // edit selected post if IT IS USER POST
    // do not let edit if it is not USER POST
    try {
      const selectedPost = await prisma.user.findFirst({
        where: { id: userId },
        select: {
          post: {
            where: {
              id: postId,
            },
          },
        },
      });

      if (selectedPost?.post.length === 0) {
        return 'No post';
      }

      if (title === '') {
        title = selectedPost!.post[0].title;
      }

      if (description === '') {
        description = selectedPost!.post[0].description;
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          post: {
            update: {
              where: {
                id: postId,
              },
              data: {
                title: title,
                description: description,
              },
            },
          },
        },
      });

      return 'Updated';
    } catch (err) {
      console.log(err);
      throw new GraphQLError('error');
    }
  }
}

export default PostServices;

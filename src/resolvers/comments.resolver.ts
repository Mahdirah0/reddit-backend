import { Arg, Query, Resolver, Ctx, Mutation } from 'type-graphql';
import { Context } from '../context';
import { ResponseMessage } from '../objectTypes';

@Resolver(ResponseMessage)
export class PostResolver {
  @Query(() => ResponseMessage)
  async getComments(@Arg('post_id') post_id: string, @Ctx() { prisma }: Context) {
    try {
      
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

  @Query(() => ResponseMessage) 
  async getUserComments(@Arg('user_id') user_id: string, @Ctx() { prisma }: Context) {
        
  }

  @Mutation(() => ResponseMessage)
  async createComments(
    @Arg('userId') userId: string,
    @Arg('comment') comment: string,
    @Ctx() { prisma }: Context
  ) {
    try {
     
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
  async addCommentLike(
    @Arg('commentId') commentId: string,
    @Ctx() { prisma }: Context
  ) {
    try {
      
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
  async decreaseCommentLike(
    @Arg('commentId') commentId: string,
    @Ctx() { prisma }: Context
  ) {
    try {
      
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
 

  // add comment
  // like and dislike
  // comment like and dislike
  // reply to comment
  //
}


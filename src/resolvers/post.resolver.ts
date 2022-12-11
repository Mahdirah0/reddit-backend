import { Arg, Query, Resolver, Ctx, Mutation } from 'type-graphql';
import { Context } from '../context';
import { Post, ResponseMessage } from '../objectTypes';
import PostServices from '../services/post.services';

@Resolver(ResponseMessage)
export class PostResolver {
  constructor(private postService: PostServices) {
    this.postService = new PostServices();
  }

  @Query(() => [Post])
  async getAllPosts(@Ctx() context: Context) {
    return this.postService.getAllPosts(context);
  }

  @Query(() => ResponseMessage)
  async getPost(@Arg('id') id: string, @Ctx() context: Context) {
    return this.postService.getPost(id, context);
  }

  @Mutation(() => ResponseMessage)
  async createPost(
    @Arg('userId') userId: string,
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Ctx() context: Context
  ) {
    return this.postService.createPost(userId, title, description, context);
  }

  @Mutation(() => ResponseMessage)
  async editPost(@Arg('postId') postId: string, @Ctx() context: Context) {
    return this.postService.editPost(postId, context);
  }

  // add comment
  // like and dislike
  // comment like and dislike
  // reply to comment
  //
}

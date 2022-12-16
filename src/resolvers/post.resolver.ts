import { Arg, Query, Resolver, Ctx, Mutation, Authorized } from 'type-graphql';
import { Context } from '../context';
import { Post, ResponseMessage } from '../objectTypes';
import PostServices from '../services/post.services';
import jwt from 'jsonwebtoken';

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

  @Authorized()
  @Query(() => [Post])
  async getUserPosts(@Ctx() context: Context) {
    const decoded: any = jwt.verify(context.token, process.env.SECRET_KEY!);
    return this.postService.getUserPosts(decoded.user?.id, context);
  }

  @Authorized()
  @Mutation(() => ResponseMessage)
  async createPost(
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Ctx() context: Context
  ) {
    const decoded: any = jwt.verify(context.token, process.env.SECRET_KEY!);
    return this.postService.createPost(
      decoded.user?.id!,
      title,
      description,
      context
    );
  }

  @Authorized()
  @Mutation(() => String)
  async editPost(
    @Arg('postId') postId: string,
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Ctx() context: Context
  ) {
    const decoded: any = jwt.verify(context.token, process.env.SECRET_KEY!);
    return this.postService.editPost(
      decoded.user?.id,
      postId,
      title,
      description,
      context
    );
  }
}

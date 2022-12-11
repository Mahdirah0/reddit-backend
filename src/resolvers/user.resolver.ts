import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../context';
import bcrypt from 'bcrypt';
import { User, ResponseMessage } from '../objectTypes';
import UserServices from '../services/user.services';

@Resolver(ResponseMessage)
export class UserResolver {
  constructor(private userService: UserServices) {
    this.userService = new UserServices();
  }

  @Query(() => [User])
  async getAllUsers(@Ctx() context: Context) {
    return this.userService.getAllUsers(context);
  }

  @Query(() => ResponseMessage)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() context: Context
  ) {
    return this.userService.login(email, password, context);
  }

  @Mutation(() => ResponseMessage)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() context: Context
  ) {
    return this.userService.createUser(name, email, password, context);
  }
}

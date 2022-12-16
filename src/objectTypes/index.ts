import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Post {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  createdAt: Date;
}

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  password: string;
}

@ObjectType()
export class Error {
  @Field(() => String)
  field: String;

  @Field(() => String)
  message: String;
}

@ObjectType()
export class ResponseMessage {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => Error, { nullable: true })
  error?: Error;

  @Field(() => String)
  message: string;

  @Field(() => String, { nullable: true })
  token?: string;
}

import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema, Query, Resolver } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

import { PostResolver, UserResolver } from './resolvers';

const prisma = new PrismaClient();

@Resolver()
class HelloResolver {
  @Query(() => String)
  async HelloWorld() {
    return 'Hello World';
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver, PostResolver, UserResolver],
  });

  const server = new ApolloServer({ schema, context: () => ({ prisma }) });

  const PORT = process.env.PORT || 4000;
  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
};

main();

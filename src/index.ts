import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildSchema } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { Context } from './context';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';

import express from 'express';

import { PostResolver, UserResolver } from './resolvers';

const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const prisma = new PrismaClient();

  const schema = await buildSchema({
    resolvers: [PostResolver, UserResolver],
  });

  const server = new ApolloServer<Context>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        token: req.headers.token,
        prisma,
        req,
        res,
      }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

main();

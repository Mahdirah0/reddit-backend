import { Request, Response } from 'express';
import { PrismaClient } from '.prisma/client';
import { User } from './objectTypes';

export interface Context {
  prisma: PrismaClient;
  token: string;
  user?: User;
}

import { PrismaClient } from '.prisma/client';
import { Request } from 'express';

export interface Context {
  prisma: PrismaClient;
  headers: Request;
}

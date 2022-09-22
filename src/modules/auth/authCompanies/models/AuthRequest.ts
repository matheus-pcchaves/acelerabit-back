import { Request } from 'express';
import { Companies } from '@prisma/client';

export interface AuthRequest extends Request {
  user: Companies;
}

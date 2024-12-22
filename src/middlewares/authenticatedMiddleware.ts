import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_OPTIONS } from '../config/config';
import { UserJWTInterface } from './types';

declare global {
  namespace Express {
    interface Request {
      user?: UserJWTInterface;
    }
  }
}

export const authenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['x-authorization'] as string;
  if (!token) {
    res.status(401).json({ message: 'Authentication token is required!' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_OPTIONS.secret) as UserJWTInterface;

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token!' });
    return;
  }
};

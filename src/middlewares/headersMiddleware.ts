import { RequestHandler } from 'express';

export const headersMiddleware: RequestHandler = (_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, x-Authorization, Authorization, Accept'
  );

  next();
};

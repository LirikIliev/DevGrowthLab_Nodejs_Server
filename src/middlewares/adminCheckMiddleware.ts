import { RequestHandler } from 'express';

import userHandler from '../services/auth';
import { USERS_ROLE } from '../config/config';

type AdminCheckQuery = {
  userId: string;
};

export const adminCheckMiddleware: RequestHandler<AdminCheckQuery> = async (
  req,
  res,
  next
) => {
  const { userId } = req.params;

  try {
    const user = await userHandler.findUser({ _id: userId });
    if (!user) {
      res.status(404).json({ message: 'User is not authenticated!' });
      return;
    }

    const isAdmin = user.role === USERS_ROLE.ADMIN;
    if (!isAdmin) {
      res.status(401).json({ message: 'User is not authorized!' });
      return;
    }

    next();
  } catch (error) {
    //! to create and apply error handling function
    res.status(400).json(error);
  }
};

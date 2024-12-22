import jwt from 'jsonwebtoken';
import { UserTokenType } from '../../types/types';
import { JWT_OPTIONS } from '../../config/config';

export const createToken = (tokenData: UserTokenType) => {
  const { secret, expiresIn } = JWT_OPTIONS;
  return jwt.sign(tokenData, secret, { expiresIn });
};

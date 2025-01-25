import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { USER_FORM_KEYS } from './config';
import userHandler from '../services/auth';
import {
  UserLoginDataType,
  UserModelDataType,
  UserTokenType,
} from '../types/types';
import { BCRYPT_SALT } from '../config/config';
import { createToken } from './helpers/helpers';
import { hasEmptyFields } from '../routes/helpers/helpers';

const postLoginRequestHandler: RequestHandler<UserLoginDataType> = async (
  req,
  res
) => {
  const body = req.body as UserLoginDataType;

  const [email, password] = USER_FORM_KEYS;
  const hasBodyEmptyFields = hasEmptyFields([email, password], body);

  if (hasBodyEmptyFields) {
    res.status(409).json({ message: 'Incorrect fulfilled form!' });
    return;
  }

  try {
    const user = await userHandler.findUser({ email: body.email });

    if (!user) {
      res.status(404).json({ message: 'User is not found' });
      return;
    }
    const userPass = user?.password ? user.password : '';
    const isPasswordCorrect = await bcrypt.compare(body.password, userPass);

    if (!isPasswordCorrect) {
      res.status(401).json({ message: 'Wrong email or password' });
      return;
    }

    const tokenData = {
      _id: user._id,
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
    } as unknown as UserTokenType;
    const token = createToken(tokenData);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const postRegistrationRequestHandler: RequestHandler = async (req, res) => {
  const body = req.body as UserModelDataType;
  const hasBodyEmptyFields = hasEmptyFields(USER_FORM_KEYS, body);

  if (hasBodyEmptyFields) {
    res.status(412).json({ message: 'Incorrect fulfilled form!' });
    return;
  }

  try {
    const { password, ...rest } = body;
    const hasEmailAlreadyExist = await userHandler.emailCheck(body.email);
    if (hasEmailAlreadyExist) {
      res.status(409).json({ message: 'The email already exist!' });
    }

    const hashedPassword = await bcrypt.hash(body.password, BCRYPT_SALT);
    const hashedData = {
      password: hashedPassword,
      ...rest,
    };
    await userHandler.addNewUser(hashedData);

    res.status(201).json({ message: 'User is successfully registered!' });
  } catch (error) {
    res.status(400).json({ message: 'Incorrect form fulfilled!' });
  }
};

export default {
  postLoginRequestHandler,
  postRegistrationRequestHandler,
};

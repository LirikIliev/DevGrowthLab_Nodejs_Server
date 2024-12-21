import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { UserLoginDataType, UserModelDataType } from '../types/types';
import { USER_FORM_KEYS } from './config';
import { hasEmptyFields } from '../routes/helpers/helpers';
import { addNewUser, emailCheck, findUser } from '../services/auth';
import { BCRYPT_SALT } from '../config/config';

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
    const user = await findUser({ email: body.email });
    const userPass = user?.password ? user.password : '';
    const isPasswordCorrect = await bcrypt.compare(body.password, userPass);

    if (!isPasswordCorrect) {
      res.status(404).json({ message: 'User was is not found' });
      return;
    }

    res.status(200).json({ message: 'User is logged successfully!', user });
  } catch (error) {
    console.error(error);
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
    const hasEmailAlreadyExist = await emailCheck(body.email);
    if (hasEmailAlreadyExist) {
      res.status(409).json({ message: 'The email already exist!' });
    }

    const hashedPassword = await bcrypt.hash(body.password, BCRYPT_SALT);
    const hashedData = {
      password: hashedPassword,
      ...rest,
    };

    const userData = await addNewUser(hashedData);

    res.status(201).json({ message: 'Successfully created!', userData });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      console.error(error.errors);
    console.log(error);
    //! to create universal error handling/translation function!
    res.status(400).json({ message: 'Incorrect form fulfilled!' });
  }
};

export default {
  postLoginRequestHandler,
  postRegistrationRequestHandler,
};

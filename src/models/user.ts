import { model, Schema } from 'mongoose';
import { EMAIL_REGEX, URL_REGEX } from '../config/config';
import { ERROR_MESSAGES } from './config';

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Email address')],
    unique: true,
    validate: {
      validator: function (email: string) {
        return EMAIL_REGEX.test(email);
      },
      message: ERROR_MESSAGES.EMAIL,
    },
  },
  password: {
    type: String,
    require: [true, ERROR_MESSAGES.REQUIRE('Password')],
    minLength: [6, ERROR_MESSAGES.MIN_LENGTH('six')],
  },
  name: {
    type: String,
    require: [true, ERROR_MESSAGES.REQUIRE('User name')],
    minLength: [3, ERROR_MESSAGES.MIN_LENGTH('three')],
  },
  role: {
    type: String,
    require: [true, ERROR_MESSAGES.REQUIRE('Role')],
  },
  avatar: {
    type: String,
    validate: {
      validator: function (avatar: string) {
        return URL_REGEX.test(avatar);
      },
      message: ERROR_MESSAGES.URL,
    },
  },
  creationAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: String,
    default: new Date(),
  },
});

export default model('User', UserSchema);

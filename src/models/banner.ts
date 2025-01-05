import { model, Schema } from 'mongoose';

import { ERROR_MESSAGES } from './config';
import { URL_REGEX } from '../config/config';

const bannerSchema = new Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  category: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Brand Category')],
  },
  name: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Name')],
  },
  description: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Description')],
    minLength: [10, ERROR_MESSAGES.MIN_LENGTH(10)],
    maxLength: [550, ERROR_MESSAGES.MAX_LENGTH(550)],
  },
  image: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Image')],
    validate: {
      validator: function (image: string) {
        return URL_REGEX.test(image);
      },
      message: ERROR_MESSAGES.URL('Image'),
    },
  },
});

export default model('Banner', bannerSchema);

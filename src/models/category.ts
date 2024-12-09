import { model, Schema } from 'mongoose';
import { URL_REGEX } from '../config/config';
import { ERROR_MESSAGES } from './config';

const CategorySchema = new Schema({
  name: {
    type: String,
    require: [true, ERROR_MESSAGES.REQUIRE('Name')],
    minLength: [3, ERROR_MESSAGES.MIN_LENGTH('three')],
  },
  image: {
    type: String,
    require: [true, ERROR_MESSAGES.REQUIRE('Image')],
    validate: {
      validator: function (image: string) {
        return URL_REGEX.test(image);
      },
      message: ERROR_MESSAGES.URL('image'),
    },
    createAt: {
      type: Date,
      require: [true, ERROR_MESSAGES.CREATION_DATE],
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
  },
});

export default model('Category', CategorySchema);

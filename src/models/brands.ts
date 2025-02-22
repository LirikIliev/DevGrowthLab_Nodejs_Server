import { model, Schema } from 'mongoose';

import { ERROR_MESSAGES } from './config';
import { URL_REGEX } from '../config/config';
import { Brand, IBrand } from './modelTypes';

const brandsSchema = new Schema({
  name: {
    type: String,
    require: [true, ERROR_MESSAGES.REQUIRE('Name')],
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

brandsSchema.statics.IsBrandExist = async function (data) {
  const brand = await this.findOne(data);

  return !!brand;
};

export default model<Brand, IBrand>('Brand', brandsSchema);

import { model, Schema } from 'mongoose';
import { URL_REGEX } from '../config/config';
import { ERROR_MESSAGES } from './config';
import { ICategory, ICategoryModel } from './modelTypes';

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Name')],
    minLength: [3, ERROR_MESSAGES.MIN_LENGTH('three')],
  },
  image: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Image')],
    validate: {
      validator: function (image: string) {
        return URL_REGEX.test(image);
      },
      message: ERROR_MESSAGES.URL('image'),
    },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  admin: {
    type: Schema.ObjectId,
    ref: 'Users',
    required: [true, ERROR_MESSAGES.REQUIRE('Admin id')],
  },
});

CategorySchema.statics.isCategoryExist = async function (
  data
): Promise<boolean> {
  const category = await this.findOne(data);

  return !!category;
};

export default model<ICategory, ICategoryModel>('Category', CategorySchema);

import { model, Schema } from 'mongoose';

import { URL_REGEX } from '../config/config';
import { BlogPost, IBlogPost } from './modelTypes';
import { ERROR_MESSAGES } from './config';

const blogPostSchema = new Schema({
  name: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Name')],
    minLength: 3,
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
  description: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Description')],
    minLength: 250,
  },
  createdAt: {
    type: Date,
    require: [true, ERROR_MESSAGES.REQUIRE('Created at')],
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    require: [true, ERROR_MESSAGES.REQUIRE('Updated at')],
    default: new Date(),
  },
});

blogPostSchema.statics.IsPostExisting = async function (data) {
  const post = await this.findOne(data);

  return !!post;
};

export default model<BlogPost, IBlogPost>('BlogPost', blogPostSchema);

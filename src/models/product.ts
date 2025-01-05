import { model, Schema } from 'mongoose';
import { ERROR_MESSAGES } from './config';

const ProductSchema = new Schema({
  title: {
    type: String,
    require: [true, ERROR_MESSAGES.TITLE],
    minLength: [3, ERROR_MESSAGES.MIN_LENGTH('three')],
  },
  price: {
    type: Number,
    require: [true, ERROR_MESSAGES.REQUIRE('Price')],
    min: [0.1, ERROR_MESSAGES.PRICE],
  },
  description: {
    type: String,
    require: [true, ERROR_MESSAGES.REQUIRE('Description')],
    minLength: [10, ERROR_MESSAGES.MIN_LENGTH('ten')],
  },
  images: {
    type: Array,
    require: [true, ERROR_MESSAGES.REQUIRE('Images')],
  },
  creationAt: {
    type: Date,
    require: [true, ERROR_MESSAGES.REQUIRE('Creation date')],
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    require: [true, ERROR_MESSAGES.REQUIRE('Updated date')],
    default: new Date(),
  },
  category: {
    type: Schema.ObjectId,
    ref: 'Categories',
  },
});

export default model('Product', ProductSchema);

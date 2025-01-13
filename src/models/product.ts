import { model, Schema, Types } from 'mongoose';
import { ERROR_MESSAGES } from './config';

const ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, ERROR_MESSAGES.TITLE],
    minLength: [3, ERROR_MESSAGES.MIN_LENGTH('Three')],
  },
  brand: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Brand')],
    minLength: 2,
  },
  type: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Type of product')],
  },
  price: {
    type: Number,
    required: [true, ERROR_MESSAGES.REQUIRE('Price')],
    min: [0.1, ERROR_MESSAGES.PRICE],
  },
  gender: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Gender')],
  },
  images: {
    type: Array,
    require: [true, ERROR_MESSAGES.REQUIRE('Images')],
  },
  sizes: {
    type: [Schema.Types.Mixed],
    required: [true, ERROR_MESSAGES.REQUIRE('Product sizes')],
    validate: {
      validator: function (value: (number | string)[]) {
        return Array.isArray(value) && value.length > 0;
      },
      message: ERROR_MESSAGES.REQUIRE('Product sizes'),
    },
  },
  color: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Color')],
  },
  colors: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'Product',
  },
  creationAt: {
    type: Date,
    required: [true, ERROR_MESSAGES.REQUIRE('Creation date')],
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    required: [true, ERROR_MESSAGES.REQUIRE('Updated date')],
    default: () => new Date(),
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
  },
});

export default model('Product', ProductSchema);

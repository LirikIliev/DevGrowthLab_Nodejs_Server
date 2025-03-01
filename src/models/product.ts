import { model, Schema, Types } from 'mongoose';
import { ERROR_MESSAGES } from './config';
import { IProduct, Product } from './modelTypes';

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
    type: [String],
    required: [true, ERROR_MESSAGES.REQUIRE('Images')],
  },
  sizes: {
    type: [
      {
        size: {
          type: Schema.Types.Mixed,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    required: [true, ERROR_MESSAGES.REQUIRE('Product sizes')],
    ref: 'Product',
    validate: {
      validator: function (value: { [key: string]: number | string }[]) {
        return value.length > 0;
      },
      message: 'At least one size must be provided!',
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
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
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
});

ProductSchema.statics.colorsUpdate = async function (
  productId: Types.ObjectId,
  productName: string
) {
  const products = await this.find({
    title: new RegExp(productName, 'i'),
    _id: { $ne: productId },
  }).lean();

  //! to add in new product all other products!

  if (products.length > 0) {
    const updates = products.map((product: Product) =>
      this.updateOne({ _id: product?._id }, { $push: { colors: productId } })
    );

    await Promise.all(updates);
  }
};

ProductSchema.statics.isProductExist = async function (data): Promise<boolean> {
  const product = await this.findOne(data);

  return !!product;
};

export default model<Product, IProduct>('Product', ProductSchema);

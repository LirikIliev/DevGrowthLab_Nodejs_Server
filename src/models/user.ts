import { model, ObjectId, Schema, Types } from 'mongoose';
import { EMAIL_REGEX, URL_REGEX } from '../config/config';
import { ERROR_MESSAGES, USERS_ROLE } from './config';
import { IUser, IUserModel } from './modelTypes';

const UserSchema = new Schema<IUser>({
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
    default: USERS_ROLE.GUEST,
  },
  avatar: {
    type: String,
    validate: {
      validator: function (avatar: string) {
        return URL_REGEX.test(avatar);
      },
      message: ERROR_MESSAGES.URL('avatar'),
    },
  },
  categories: [{ type: Schema.ObjectId }],
  products: [{ type: Schema.ObjectId }],
  creationAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.statics.isEmailExist = async function (
  email: string
): Promise<boolean> {
  const user = await this.findOne({ email: email });

  return !!user;
};

UserSchema.statics.removeCategory = async function (
  userId: string,
  catId: string
) {
  const user = await this.findOne({ _id: userId });
  if (!user || !user.categories || user.role !== USERS_ROLE.ADMIN) return;
  const isCategoryExist = user.categories.find(
    (cat: Types.ObjectId) => cat.toString() === catId
  );
  if (!isCategoryExist) return;

  user.categories = user.categories.filter(
    (cat: ObjectId) => cat.toString() !== catId
  );

  await user.save();
};

UserSchema.statics.removeProduct = async function (
  userId: string,
  productId: string
) {
  const user = await this.findOne({ _id: userId });
  if (!user || !user.products || user.role !== USERS_ROLE.ADMIN) return;
  const isProductExist = user.products.find(
    (product: Types.ObjectId) => product.toString() === productId
  );
  if (!isProductExist) return;

  user.products = user.products.filter(
    (product: ObjectId) => product.toString() !== productId
  );

  await user.save();
};

UserSchema.statics.addCategory = async function (
  userId: string,
  catId: Types.ObjectId
) {
  const user = await this.findOne({ _id: userId });
  if (!user || !user.categories || user.role !== USERS_ROLE.ADMIN) return;
  const isCategoryExist = user.categories.find(
    (cat: Types.ObjectId) => cat === catId
  );
  if (isCategoryExist) return;

  user.categories.push(catId);
  await user.save();
};

UserSchema.statics.addProduct = async function (
  userId: string,
  productId: Types.ObjectId
) {
  const user = await this.findOne({ _id: userId });
  if (!user || !user.products || user.role !== USERS_ROLE.ADMIN) return;
  const isProductExist = user.products.find(
    (product: Types.ObjectId) => product === productId
  );
  if (isProductExist) return;

  user.products.push(productId);
  await user.save();
};
export default model<IUser, IUserModel>('User', UserSchema);

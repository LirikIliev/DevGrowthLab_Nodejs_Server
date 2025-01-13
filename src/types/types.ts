import { Types } from 'mongoose';

export type MongooseSearchingType = { [key: string | number]: string | number };

export type UserTokenType = {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  role: string;
};

export type UserModelDataType = {
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

export type UserLoginDataType = {
  email: string;
  password: string;
};

export type ProductModelDataType = {
  title: string;
  brand: string;
  type: string;
  price: number;
  gender: string;
  sizes: (string | number)[];
  images: string[];
  color: string;
  colors?: string[];
  creationAt: Date;
  updatedAt: Date;
  category: string;
};

export type CategoryModelDataType = {
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  admin: string;
};

export type BannerModelDateType = {
  date?: string | Date;
  name: string;
  image: string;
};

export type BrandModelDateType = {
  name: string;
  image: string;
};

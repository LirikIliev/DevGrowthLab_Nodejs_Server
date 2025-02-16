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
  role?: string;
  avatar: string;
};

export type UserLoginDataType = {
  email: string;
  password: string;
};

export type CategoryModelDataType = {
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  admin: string;
};

export type BannerModelDateType = {
  name: string;
  image: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type BrandModelDateType = {
  name: string;
  image: string;
};

export type BlogPostModelDataType = {
  name: string;
  image: string;
  description: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

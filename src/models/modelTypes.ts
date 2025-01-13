import { Model, Types } from 'mongoose';

export interface IUser extends Document {
  _id?: string;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Model<IUser> {
  isEmailExist(email: string): Promise<boolean>;
  addCategory(categoryId: Types.ObjectId): Promise<IUser>;
  removeCategory(categoryId: string): Promise<IUser>;
  addProduct(productId: Types.ObjectId): Promise<IUser>;
  removeProduct(productId: string): Promise<IUser>;
}

export interface ICategory extends Document {
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

type MongooseSearchingType = { [key: string | number]: string | number };
export interface ICategoryModel extends Model<ICategory> {
  isCategoryExist: (data: MongooseSearchingType) => Promise<boolean>;
}

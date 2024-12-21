import { Model, ObjectId, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  _id?: string;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  categories?: Schema.Types.ObjectId[];
  products?: Schema.Types.ObjectId[];
  creationAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Model<IUser> {
  isEmailExist(email: string): Promise<boolean>;
  addCategory(userId: string, categoryId: Types.ObjectId): Promise<IUser>;
  removeCategory(userId: string, categoryId: string): Promise<IUser>;
  addProduct(userId: string, productId: Types.ObjectId): Promise<IUser>;
  removeProduct(userId: string, productId: string): Promise<IUser>;
}

export interface ICategory extends Document {
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  admin: ObjectId;
}

type MongooseSearchingType = { [key: string | number]: string | number };
export interface ICategoryModel extends Model<ICategory> {
  isCategoryExist: (data: MongooseSearchingType) => Promise<boolean>;
}

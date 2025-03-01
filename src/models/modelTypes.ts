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

interface Size {
  size: string | number;
  quantity: number;
}
interface Size {
  size: string | number;
  quantity: number;
}

export interface Product {
  _id?: Types.ObjectId;
  save(): unknown;
  title: string;
  brand: string;
  type: string;
  price: number;
  gender: string;
  images: string[];
  sizes: Size[];
  color: string;
  colors: Types.ObjectId[];
  category?: Types.ObjectId;
  creationAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Model<Product> {
  colorsUpdate: (
    productId: Types.ObjectId,
    productName: string
  ) => Promise<void>;
  isProductExist: (data: MongooseSearchingType) => Promise<boolean>;
}

interface IData {
  name: string;
  image: string;
}

export interface Brand extends IData {
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
export interface IBrand extends Model<Brand> {
  IsBrandExist: (data: MongooseSearchingType) => Promise<boolean>;
}

export interface Banner extends IData {
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IBanner extends Model<Banner> {
  IsBannerExist: (data: MongooseSearchingType) => Promise<boolean>;
}

export interface BlogPost extends IData {
  description: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IBlogPost extends Model<BlogPost> {
  IsPostExisting: (data: MongooseSearchingType) => Promise<boolean>;
}
type MongooseSearchingType = { [key: string | number]: string | number };
export interface ICategoryModel extends Model<ICategory> {
  isCategoryExist: (data: MongooseSearchingType) => Promise<boolean>;
}

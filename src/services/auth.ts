import User from '../models/user';
import { IUser } from '../models/modelTypes';
import { UserModelDataType } from '../types/types';
import { Types } from 'mongoose';

type GetUserType = Partial<IUser>;

const findUsers = (data: GetUserType): Promise<IUser[] | []> =>
  User.find(data).exec();
const findUser = (data: GetUserType): Promise<IUser | null> =>
  User.findOne(data).exec();
const findUserById = (userId: string): Promise<IUser | null> =>
  User.findById(userId);
const addNewUser = (data: UserModelDataType) => new User(data).save();
const emailCheck = (email: string) => User.isEmailExist(email);
const addCategoryToUser = (categoryId: Types.ObjectId) =>
  User.addCategory(categoryId);
const rmvCategoryFromUser = (categoryId: string) =>
  User.removeCategory(categoryId);
const addProductToUser = (productId: Types.ObjectId) =>
  User.addProduct(productId);
const rmvProductFromUser = (productId: string) => User.removeProduct(productId);

export default {
  findUsers,
  findUser,
  findUserById,
  addNewUser,
  emailCheck,
  addCategoryToUser,
  rmvCategoryFromUser,
  addProductToUser,
  rmvProductFromUser,
};

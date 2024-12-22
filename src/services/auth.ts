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
const addCategoryToUser = (userId: string, categoryId: Types.ObjectId) =>
  User.addCategory(userId, categoryId);
const rmvCategoryFromUser = (userId: string, categoryId: string) =>
  User.removeCategory(userId, categoryId);
const addProductToUser = (userId: string, productId: Types.ObjectId) =>
  User.addProduct(userId, productId);
const rmvProductFromUser = (userId: string, productId: string) =>
  User.removeProduct(userId, productId);

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

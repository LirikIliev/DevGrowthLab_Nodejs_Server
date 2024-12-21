import User from '../models/user';
import { IUser } from '../models/modelTypes';
import { UserModelDataType } from '../types/types';
import { Types } from 'mongoose';

type GetUserType = Partial<IUser>;

export const findUsers = (data: GetUserType): Promise<IUser[] | []> =>
  User.find(data).exec();

export const findUser = (data: GetUserType): Promise<IUser | null> =>
  User.findOne(data).exec();
export const addNewUser = (data: UserModelDataType) => new User(data).save();
export const emailCheck = (email: string) => User.isEmailExist(email);
export const addCategoryToUser = (userId: string, categoryId: Types.ObjectId) =>
  User.addCategory(userId, categoryId);
export const rmvCategoryFromUser = (userId: string, categoryId: string) =>
  User.removeCategory(userId, categoryId);
export const addProductToUser = (userId: string, productId: Types.ObjectId) =>
  User.addProduct(userId, productId);
export const rmvProductFromUser = (userId: string, productId: string) =>
  User.removeProduct(userId, productId);

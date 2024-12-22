import Category from '../models/category';
import { CategoryModelDataType, MongooseSearchingType } from '../types/types';

export const getCategories = () => Category.find();
export const findCategoryById = (id: string) => Category.findOne({ _id: id });
export const addNewCategory = (data: CategoryModelDataType) =>
  new Category(data).save();
export const updCategory = (id: string, data: CategoryModelDataType) =>
  Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const checkCategory = (data: MongooseSearchingType) =>
  Category.isCategoryExist(data);
export const rmvCategory = (id: string) => Category.findByIdAndDelete(id);

export default {
  getCategories,
  findCategoryById,
  addNewCategory,
  updCategory,
  checkCategory,
  rmvCategory,
};

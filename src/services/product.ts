import { IProduct } from '../models/modelTypes';
import Product from '../models/product';
import { MongooseSearchingType } from '../types/types';

const getAllProducts = () => Product.find();
const getProductsByCategoryId = (categoryId: string) =>
  Product.find({ category: categoryId });
const checkProduct = (data: MongooseSearchingType) =>
  Product.isProductExist(data);
const getProductsByType = (typeName: string) =>
  Product.find({ type: typeName });
const findProductById = (productId: string) =>
  Product.findOne({ _id: productId });
const addNewProductToDb = (data: IProduct) => new Product(data).save();
const updProductById = (productId: string, data: IProduct) =>
  Product.findByIdAndUpdate(productId, data);
const rmvProductById = (productId: string) =>
  Product.findByIdAndDelete(productId);

export default {
  getAllProducts,
  getProductsByCategoryId,
  checkProduct,
  getProductsByType,
  findProductById,
  addNewProductToDb,
  updProductById,
  rmvProductById,
};

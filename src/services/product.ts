import Product from '../models/product';
import { ProductModelDataType } from '../types/types';

const getAllProducts = () => Product.find();
const getProductsByCategoryId = (categoryId: string) =>
  Product.find({ category: categoryId });
const getProductsByType = (typeName: string) =>
  Product.find({ type: typeName });
const findProductById = (productId: string) =>
  Product.findOne({ id: productId });
const addNewProductToDb = (data: ProductModelDataType) =>
  new Product(data).save();
const updProductById = (productId: string, data: ProductModelDataType) =>
  Product.findByIdAndUpdate(productId, data);
const rmvProductById = (productId: string) =>
  Product.findByIdAndDelete(productId);

export default {
  getAllProducts,
  getProductsByCategoryId,
  getProductsByType,
  findProductById,
  addNewProductToDb,
  updProductById,
  rmvProductById,
};

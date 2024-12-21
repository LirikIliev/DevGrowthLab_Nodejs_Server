import Product from '../models/product';
import { ProductModelDataType } from '../types/types';

const getAllProducts = () => Product.find();
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
  findProductById,
  addNewProductToDb,
  updProductById,
  rmvProductById,
};

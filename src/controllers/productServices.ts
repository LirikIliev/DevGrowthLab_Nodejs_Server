import { RequestHandler } from 'express';

import { PRODUCT_FORM_KEYS } from './config';
import userHandler from '../services/auth';
import productHandler from '../services/product';
import { ProductModelDataType } from '../types/types';
import { hasEmptyFields } from '../routes/helpers/helpers';

type ProductQueryType = { productId: string };
type ProductUpdateRemoveQuery = { productId: string; userId: string };
type ProductCategoryQueryType = { categoryId: string };
type ProductTypeQueryType = { typeName: string };

const getListOfProducts: RequestHandler = async (_, res) => {
  try {
    const products = await productHandler.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
  }
};

const getProductsByCategory: RequestHandler<ProductCategoryQueryType> = async (
  req,
  res
) => {
  try {
    const { categoryId } = req.params;
    const products = await productHandler.getProductsByCategoryId(categoryId);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
  }
};

const getProductsByType: RequestHandler<ProductTypeQueryType> = async (
  req,
  res
) => {
  try {
    const { typeName } = req.params;
    const products = await productHandler.getProductsByType(typeName);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
  }
};

const getProductById: RequestHandler<ProductQueryType> = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await productHandler.findProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addNewProduct: RequestHandler = async (req, res) => {
  const body = req.body as ProductModelDataType;
  const hasBodyEmptyFields = hasEmptyFields(PRODUCT_FORM_KEYS, body);

  if (hasBodyEmptyFields) {
    res.status(412).json({ message: 'Body is not corrected fulfilled!' });
    return;
  }

  try {
    const productBody = JSON.parse(JSON.stringify(body));
    const newProduct = await productHandler.addNewProductToDb(productBody);
    if (
      typeof newProduct !== 'object' &&
      Object.keys(newProduct).length === 0
    ) {
      res.status(400).json({ message: 'There is a problem with new product!' });
      return;
    }

    await userHandler.addProductToUser(newProduct._id);
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const updateProduct: RequestHandler<ProductUpdateRemoveQuery> = async (
  req,
  res
) => {
  const body = req.body as ProductModelDataType;
  const productId = req.params.productId;
  const hasBodyEmptyFields = hasEmptyFields(PRODUCT_FORM_KEYS, body);

  if (hasBodyEmptyFields) {
    res.status(412).json({ message: 'Body is not correctly fulfilled!' });
    return;
  }

  try {
    const updatedBodyData = JSON.parse(
      JSON.stringify({ ...body, updatedAt: new Date() })
    );
    await productHandler.updProductById(productId, updatedBodyData);
  } catch (error) {
    res.status(400).json(error);
  }

  res.status(200).json(body);
};

const removeProduct: RequestHandler<ProductUpdateRemoveQuery> = async (
  req,
  res
) => {
  const productId = req.params.productId;

  try {
    await productHandler.rmvProductById(productId);
    await userHandler.rmvProductFromUser(productId);
    res.status(200).json({ message: 'The product was successfully removed!' });
  } catch (error) {
    res.status(400).json(error);
  }
};

export default {
  getListOfProducts,
  getProductsByCategory,
  getProductsByType,
  getProductById,
  addNewProduct,
  updateProduct,
  removeProduct,
};

import { RequestHandler } from 'express';

import productHandler from '../services/product';
import { ProductModelDataType } from '../types/types';
import { hasEmptyFields } from '../routes/helpers/helpers';
import { PRODUCT_FORM_KEYS } from './config';
import {
  addProductToUser,
  findUser,
  rmvProductFromUser,
} from '../services/auth';

type ProductQueryType = { productId: string };
type ProductUpdateRemoveQuery = { productId: string; userId: string };
type ProductAddNewQuery = { userId: string };

const getListOfProducts: RequestHandler = async (_, res) => {
  try {
    const products = await productHandler.getAllProducts();
    res.status(200).json({
      message: 'Products',
      products,
    });
  } catch (error) {
    console.error(error);
  }
};

const getProductById: RequestHandler<ProductQueryType> = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await productHandler.findProductById(productId);
    res.status(200).json({ message: 'Product', product });
  } catch (error) {
    res.status(400).json(error);
  }
};

const addNewProduct: RequestHandler<ProductAddNewQuery> = async (req, res) => {
  const body = req.body as ProductModelDataType;
  const userId = req.params.userId;
  const hasBodyEmptyFields = hasEmptyFields(PRODUCT_FORM_KEYS, body);

  if (hasBodyEmptyFields) {
    res.status(412).json({ message: 'Body is not corrected fulfilled!' });
    return;
  }

  try {
    const user = await findUser({ _id: userId });

    if (!user?.role || user.role !== 'admin') {
      res.status(401).json({ message: 'Your are not authorized!' });
      return;
    }

    const productBody = JSON.parse(JSON.stringify({ ...body, admin: userId }));
    const newProduct = await productHandler.addNewProductToDb(productBody);
    if (
      typeof newProduct !== 'object' &&
      Object.keys(newProduct).length === 0
    ) {
      res.status(400).json({ message: 'There is a problem with new product!' });
      return;
    }

    await addProductToUser(body.admin, newProduct._id);
    res.status(200).json({ message: 'New added product', newProduct });
  } catch (error) {
    //! to create error handler functionality!!!
    res.status(400).json(error);
  }
};

const updateProduct: RequestHandler<ProductUpdateRemoveQuery> = async (
  req,
  res
) => {
  const body = req.body as ProductModelDataType;
  const productId = req.params.productId;
  const userId = req.params.userId;
  const hasBodyEmptyFields = hasEmptyFields(PRODUCT_FORM_KEYS, body);

  if (hasBodyEmptyFields) {
    res.status(412).json({ message: 'Body is not correctly fulfilled!' });
    return;
  }

  try {
    const user = await findUser({ _id: userId });

    if (!user) {
      res.status(400).json({ message: 'User was not found!' });
      return;
    }
    const isAdmin = user.role === 'admin';

    if (!isAdmin) {
      res.status(401).json({ message: 'User is not authorized!' });
      return;
    }

    const updatedBodyData = JSON.parse(
      JSON.stringify({ ...body, admin: userId, updatedAt: new Date() })
    );
    await productHandler.updProductById(productId, updatedBodyData);
  } catch (error) {
    // ! to create and user error handler extract function!
    res.status(400).json(error);
  }

  res.json({ message: 'Success request for product update.', product: body });
};

const removeProduct: RequestHandler<ProductUpdateRemoveQuery> = async (
  req,
  res
) => {
  const productId = req.params.productId;
  const userId = req.params.userId;

  try {
    const user = await findUser({ _id: userId });
    if (!user) {
      res.status(404).json({ message: 'User is not found!' });
      return;
    }

    const isAdmin = user.role === 'admin';
    if (!isAdmin) {
      res.status(401).json({ message: 'The user is not authorized!' });
      return;
    }

    await productHandler.rmvProductById(productId);
    await rmvProductFromUser(userId, productId);
    res.status(200).json({ message: 'The product was successfully removed!' });
  } catch (error) {
    res.status(400).json(error);
  }
};

export default {
  getListOfProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  removeProduct,
};

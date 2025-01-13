import { Router } from 'express';

import productHandlers from '../controllers/productServices';
import { adminCheckMiddleware } from '../middlewares/adminCheckMiddleware';
import { authenticateMiddleware } from '../middlewares/authenticatedMiddleware';
import ROUTE_PATHS from './config';

const router = Router();
// GET => get all products (list of them)
router.get(ROUTE_PATHS.GET_PRODUCTS, productHandlers.getListOfProducts);
// GET => get product by id;
router.get(ROUTE_PATHS.GET_PRODUCT, productHandlers.getProductById);
// GET => get product by categories
router.get(
  ROUTE_PATHS.GET_PRODUCT_BY_CATEGORY,
  productHandlers.getProductsByCategory
);
// GET => get products by typeName;
router.get(
  ROUTE_PATHS.GET_PRODUCT_BY_TYPE_NAME,
  productHandlers.getProductsByType
);
// POST => add new product;
router.post(
  ROUTE_PATHS.ADD_PRODUCT,
  authenticateMiddleware,
  adminCheckMiddleware,
  productHandlers.addNewProduct
);
// UPDATE => update product by id;
router.put(
  ROUTE_PATHS.UPDATE_PRODUCT,
  authenticateMiddleware,
  adminCheckMiddleware,
  productHandlers.updateProduct
);
// DELETE => delete product by id;
router.delete(
  ROUTE_PATHS.REMOVE_PRODUCT,
  authenticateMiddleware,
  adminCheckMiddleware,
  productHandlers.removeProduct
);

export default router;

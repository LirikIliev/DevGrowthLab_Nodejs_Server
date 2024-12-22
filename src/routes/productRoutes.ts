import { Router } from 'express';

import productHandlers from '../controllers/productServices';
import { adminCheckMiddleware } from '../middlewares/adminCheckMiddleware';

const router = Router();
// GET => get all products (list of them)
router.get('/public/list-of-products', productHandlers.getListOfProducts);
// GET => get product by id;
router.get('/public/:productId/product-data', productHandlers.getProductById);
// POST => add new product;
router.post(
  '/private/:userId/add-new-product',
  adminCheckMiddleware,
  productHandlers.addNewProduct
);
// UPDATE => update product by id;
router.put(
  '/private/:userId/:productId/update-product',
  adminCheckMiddleware,
  productHandlers.updateProduct
);
// DELETE => delete product by id;
router.delete(
  '/private/:useId/:productId/delete-product',
  adminCheckMiddleware,
  productHandlers.removeProduct
);

export default router;

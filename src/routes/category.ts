import { Router } from 'express';

import categoryService from '../controllers/categoryService';
import { adminCheckMiddleware } from '../middlewares/adminCheckMiddleware';
import { authenticateMiddleware } from '../middlewares/authenticatedMiddleware';
import ROUTE_PATHS from './config';

const router = Router();

//GET => get list of categories;
router.get(ROUTE_PATHS.GET_CATEGORIES, categoryService.getListOfCategory);
// GET => get category by id;
router.get(ROUTE_PATHS.ADD_CATEGORY, categoryService.getCategoryById);
//POST => add new category;
router.post(
  ROUTE_PATHS.ADD_CATEGORY,
  authenticateMiddleware,
  adminCheckMiddleware,
  categoryService.addNewCategory
);
//PUT =>  update category;
router.put(
  ROUTE_PATHS.UPDATE_CATEGORY,
  authenticateMiddleware,
  adminCheckMiddleware,
  categoryService.updateCategory
);
//DELETE => remove categories;
router.delete(
  ROUTE_PATHS.REMOVE_CATEGORY,
  authenticateMiddleware,
  adminCheckMiddleware,
  categoryService.removeCategory
);

export default router;

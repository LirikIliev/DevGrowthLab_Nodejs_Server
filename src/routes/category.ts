import { Router } from 'express';
import categoryService from '../controllers/categoryService';
import { adminCheckMiddleware } from '../middlewares/adminCheckMiddleware';

const router = Router();

//GET => get list of categories;
router.get('/public/list-of-categories', categoryService.getListOfCategory);
// GET => get category by id;
router.get('/public/:categoryId/category', categoryService.getCategoryById);
//POST => add new category;
router.post(
  '/private/:userId/add-new-category',
  adminCheckMiddleware,
  categoryService.addNewCategory
);
//PUT =>  update category;
router.put(
  '/private/:userId/:categoryId/update-category',
  adminCheckMiddleware,
  categoryService.updateCategory
);
//DELETE => remove categories;
router.delete(
  '/private/:userId/:categoryId/remove-category',
  adminCheckMiddleware,
  categoryService.removeCategory
);

export default router;

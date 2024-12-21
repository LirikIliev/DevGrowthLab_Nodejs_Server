import { Router } from 'express';
import categoryService from '../controllers/categoryService';

const router = Router();

//GET => get list of categories;
router.get('/public/list-of-categories', categoryService.getListOfCategory);
// GET => get category by id;
router.get('/public/:categoryId/category', categoryService.getCategoryById);
//POST => add new category;
router.post('/private/new/add-category', categoryService.addNewCategory);
//PUT =>  update category;
router.put(
  '/private/:adminId/:categoryId/update-category',
  categoryService.updateCategory
);
//DELETE => remove categories;
router.delete(
  '/private/:adminId/:categoryId/remove-category',
  categoryService.removeCategory
);

export default router;

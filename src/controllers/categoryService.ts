import { RequestHandler } from 'express';

import { CATEGORY_FORM_KEYS } from './config';
import categoryService from '../services/category';
import { CategoryModelDataType } from '../types/types';
import userHandler from '../services/auth';
import { hasEmptyFields } from '../routes/helpers/helpers';

type CategoryQueryType = {
  categoryId: string;
};

const getListOfCategory: RequestHandler = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json({ message: 'Categories', categories });
  } catch (error) {
    //! to add error handling functionality
    res.status(400).json(error);
  }
};

const getCategoryById: RequestHandler<CategoryQueryType> = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await categoryService.findCategoryById(categoryId);

    res.status(200).json({ message: 'Category', category });
  } catch (error) {
    //! to create error handling function.
    res.status(404).json({ message: error });
  }
};

const addNewCategory: RequestHandler = async (req, res) => {
  const body = req.body as CategoryModelDataType;
  const hasBodyEmptyFields = hasEmptyFields(CATEGORY_FORM_KEYS, body);
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ message: 'User is not authenticated!' });
    return;
  }

  if (hasBodyEmptyFields) {
    res.status(412).json({ message: 'Body is not corrected fulfilled!' });
    return;
  }

  try {
    const isCategoryExist = await categoryService.checkCategory({
      name: body.name,
    });
    if (isCategoryExist) {
      res.status(412).json({ message: 'This category already exist.' });
      return;
    }

    const updatedBody = JSON.parse(
      JSON.stringify({
        ...body,
        admin: userId,
      })
    );
    const newCategory = await categoryService.addNewCategory(updatedBody);
    const categoryId = newCategory._id;

    if (categoryId) await userHandler.addCategoryToUser(userId, categoryId);
    res
      .status(201)
      .json({ message: 'Category was successfully added', newCategory });
  } catch (error) {
    //! to create error handler function.
    res.status(400).json({ message: error });
  }
};

const updateCategory: RequestHandler<CategoryQueryType> = async (req, res) => {
  const body = req.body as CategoryModelDataType;
  const categoryId = req.params.categoryId;
  const userId = req.user?._id;

  const hasBodyEmptyFields = hasEmptyFields(CATEGORY_FORM_KEYS, body);
  if (hasBodyEmptyFields) {
    res.status(412).json({ message: 'The body is not correct fulfilled!' });
    return;
  }

  try {
    const category = await categoryService.findCategoryById(categoryId);
    if (!category) {
      res.status(404).json({ message: 'The category is not exist' });
      return;
    }

    const isUserAuthor = category.admin.toString() === userId;
    if (!isUserAuthor) {
      res.status(401).json({ message: 'The user is not authorized!' });
      return;
    }

    const updatedBody = JSON.parse(
      JSON.stringify({
        ...body,
        admin: userId,
        updatedAt: new Date(),
      })
    );
    const updatedCategory = await categoryService.updCategory(
      categoryId,
      updatedBody
    );
    res
      .status(200)
      .json({ message: 'Category update was successful.', updatedCategory });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const removeCategory: RequestHandler<CategoryQueryType> = async (req, res) => {
  const categoryId = req.params.categoryId;
  const userId = req.user?._id;

  try {
    const category = await categoryService.findCategoryById(categoryId);

    if (!category) {
      res.status(404).json({ message: 'The category is not exist' });
      return;
    }

    const isUserAuthor = category.admin.toString() === userId;
    if (!isUserAuthor) {
      res
        .status(401)
        .json({ message: 'The user is not authorized for this operation!' });
      return;
    }

    await categoryService.rmvCategory(categoryId);
    await userHandler.rmvCategoryFromUser(userId, categoryId);
    res.status(200).json({ message: 'Category was successfully removed.' });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export default {
  getListOfCategory,
  addNewCategory,
  getCategoryById,
  updateCategory,
  removeCategory,
};

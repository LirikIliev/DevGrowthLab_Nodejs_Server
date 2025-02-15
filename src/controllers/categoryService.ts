import { RequestHandler } from 'express';

import { STANDARD_FORM_KEYS } from './config';
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
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCategoryById: RequestHandler<CategoryQueryType> = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await categoryService.findCategoryById(categoryId);

    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const addNewCategory: RequestHandler = async (req, res) => {
  const body = req.body as CategoryModelDataType;
  const hasBodyEmptyFields = hasEmptyFields(STANDARD_FORM_KEYS, body);

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

    const newCategory = await categoryService.addNewCategory(body);
    const categoryId = newCategory._id;

    if (categoryId) await userHandler.addCategoryToUser(categoryId);
    res
      .status(201)
      .json({ message: 'Category was successfully added', newCategory });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const updateCategory: RequestHandler<CategoryQueryType> = async (req, res) => {
  const body = req.body as CategoryModelDataType;
  const categoryId = req.params.categoryId;

  const hasBodyEmptyFields = hasEmptyFields(STANDARD_FORM_KEYS, body);
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

    const updatedBody = JSON.parse(
      JSON.stringify({
        ...body,
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

  try {
    const category = await categoryService.findCategoryById(categoryId);

    if (!category) {
      res.status(404).json({ message: 'The category is not exist' });
      return;
    }

    await categoryService.rmvCategory(categoryId);
    //! to remove this logic
    await userHandler.rmvCategoryFromUser(categoryId);
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

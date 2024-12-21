import { RequestHandler } from 'express';

import {
  addNewCategoryToDb,
  categoryExistingCheck,
  findCategoryById,
  getAllCategories,
  rmvCategory,
  updCategory,
} from '../services/category';
import { CategoryModelDataType } from '../types/types';
import { hasEmptyFields } from '../routes/helpers/helpers';
import { CATEGORY_FORM_KEYS } from './config';
import { addCategoryToUser, rmvCategoryFromUser } from '../services/auth';

type CategoryQueryType = {
  categoryId: string;
};

interface PrivateCategoryQueryType extends CategoryQueryType {
  adminId: string;
}

const getListOfCategory: RequestHandler = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json({ message: 'Categories', categories });
  } catch (error) {
    //! to add error handling functionality
    res.status(400).json(error);
  }
};

const getCategoryById: RequestHandler<CategoryQueryType> = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await findCategoryById(categoryId);

    res.status(200).json({ message: 'Category', category });
  } catch (error) {
    //! to create error handling function.
    res.status(404).json({ message: error });
  }
};
const addNewCategory: RequestHandler = async (req, res) => {
  const body = req.body as CategoryModelDataType;

  const hasBodyEmptyFields = hasEmptyFields(CATEGORY_FORM_KEYS, body);

  if (hasBodyEmptyFields) {
    res.status(412).json({ message: 'Body is not corrected fulfilled!' });
    return;
  }

  try {
    const isCategoryExist = await categoryExistingCheck({ name: body.name });
    if (isCategoryExist) {
      res.status(412).json({ message: 'This category already exist.' });
      return;
    }

    const userId = body.admin;
    //! To check if user is role of admin!
    const newCategory = await addNewCategoryToDb(body);
    const categoryId = newCategory._id;

    if (categoryId) await addCategoryToUser(userId, categoryId);
    res
      .status(201)
      .json({ message: 'Category was successfully added', newCategory });
  } catch (error) {
    //! to create error handler function.
    res.status(400).json({ message: error });
  }
};

const updateCategory: RequestHandler<PrivateCategoryQueryType> = async (
  req,
  res
) => {
  const body = req.body as CategoryModelDataType;
  const categoryId = req.params.categoryId;
  const adminId = req.params.adminId;

  const hasBodyEmptyFields = hasEmptyFields(CATEGORY_FORM_KEYS, body);

  if (hasBodyEmptyFields) {
    res.status(412).json({ message: 'The body is not correct fulfilled!' });
    return;
  }

  try {
    const category = await findCategoryById(categoryId);

    if (!category) {
      res.status(404).json({ message: 'The category is not exist' });
      return;
    }

    const isUserAuthor = category.admin.toString() === adminId;
    if (!isUserAuthor) {
      res.status(401).json({ message: 'The user is not authorized!' });
      return;
    }

    const updatedBody = {
      ...body,
      updatedAt: new Date(),
    };
    const updatedCategory = await updCategory(categoryId, updatedBody);
    res
      .status(200)
      .json({ message: 'Category update was successful.', updatedCategory });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const removeCategory: RequestHandler<PrivateCategoryQueryType> = async (
  req,
  res
) => {
  const categoryId = req.params.categoryId;
  const adminId = req.params.adminId;

  try {
    const category = await findCategoryById(categoryId);

    if (!category) {
      res.status(404).json({ message: 'The category is not exist' });
      return;
    }

    const isUserAuthor = category.admin.toString() === adminId;
    if (!isUserAuthor) {
      res
        .status(401)
        .json({ message: 'The user is not authorized for this operation!' });
      return;
    }

    await rmvCategory(categoryId);
    await rmvCategoryFromUser(adminId, categoryId);
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

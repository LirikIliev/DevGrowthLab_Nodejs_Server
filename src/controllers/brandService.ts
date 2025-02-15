import { RequestHandler } from 'express';

import brandService from '../services/brand';
import { hasEmptyFields } from '../routes/helpers/helpers';
import { STANDARD_FORM_KEYS } from './config';

const getAllBrands: RequestHandler = async (req, res) => {
  try {
    const brands = await brandService.getAllBrands();
    res.status(200).json(brands);
  } catch (error) {
    res.status(404).json(error);
  }
};

const addNewBrand: RequestHandler = async (req, res) => {
  const body = req.body;
  const hasBodyEmptyFields = hasEmptyFields(STANDARD_FORM_KEYS, body);

  if (hasBodyEmptyFields) {
    res.status(412).json({ message: 'Body is not corrected fulfilled!' });
    return;
  }

  try {
    const isBrandExist = await brandService.checkBrand({ name: body.name });
    if (isBrandExist) {
      res.status(412).json({ message: 'This brand already exist.' });
      return;
    }

    await brandService.addNewBrand(body);
    res.status(200).json({ message: 'New brand was successfully created!' });
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateBrand: RequestHandler = async (req, res) => {
  const body = req.body;
  const brandId = req.params.brandId;

  const hasBodyEmptyFields = hasEmptyFields(STANDARD_FORM_KEYS, body);

  if (hasBodyEmptyFields) {
    res.status(412).json({ message: 'Body is not corrected fulfilled!' });
    return;
  }

  try {
    const brand = await brandService.getBrandById(brandId);

    if (!brand) {
      res.status(404).json({ message: 'The brand is not exist' });
      return;
    }

    const updatedBody = JSON.parse(
      JSON.stringify({ ...body, updatedAt: new Date() })
    );

    const updatedBrand = await brandService.updateBrand(brandId, updatedBody);

    res
      .status(200)
      .json({ message: 'Category update was successful.', updatedBrand });
  } catch (error) {
    res.status(404).json(error);
  }
};

const removeBrand: RequestHandler = async (req, res) => {
  const id = req.params.brandId;

  try {
    const isBrandExist = brandService.getBrandById(id);
    if (!isBrandExist) {
      res.status(404).json({ message: 'The brand is not exist' });
    }

    await brandService.rmvBrand(id);
    res.status(200).json({ message: 'The brand was successfully removed!' });
  } catch (error) {
    res.json(404).json(error);
  }
};

export default {
  getAllBrands,
  addNewBrand,
  updateBrand,
  removeBrand,
};

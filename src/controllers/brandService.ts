import { RequestHandler } from 'express';

import brandService from '../services/brand';

const getAllBrands: RequestHandler = async (req, res) => {
  try {
    const brands = await brandService.getAllBrands();
    res.status(200).json(brands);
  } catch (error) {
    res.status(404).json(error);
  }
};

export default {
  getAllBrands,
};

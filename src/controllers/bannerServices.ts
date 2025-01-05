import { RequestHandler } from 'express';

import bannerServices from '../services/banner';

const getAllBanners: RequestHandler = async (req, res) => {
  try {
    console.log('test');
    const banners = await bannerServices.getAllBanners();
    res.status(200).json(banners);
  } catch (error) {
    res.status(404).json(error);
  }
};

export default {
  getAllBanners,
};

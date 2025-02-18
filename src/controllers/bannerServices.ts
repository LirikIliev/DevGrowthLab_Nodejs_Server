import { RequestHandler } from 'express';

import bannerServices from '../services/banner';
import { hasEmptyFields } from '../routes/helpers/helpers';
import { BANNER_FORM_KEYS } from './config';

const getAllBanners: RequestHandler = async (req, res) => {
  try {
    const banners = await bannerServices.getAllBanners();
    res.status(200).json(banners);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getBannerById: RequestHandler = async (req, res) => {
  const id = req.params.bannerId;

  try {
    const banner = await bannerServices.getBannerById(id);

    res.status(200).json(banner);
  } catch (error) {
    res.status(404).json(error);
  }
};

const addNewBanner: RequestHandler = async (req, res) => {
  const body = req.body;

  const hasBodyEmptyFields = hasEmptyFields(BANNER_FORM_KEYS, body);

  if (hasBodyEmptyFields) {
    res.status(412).json({ message: 'The body is not correctly fulfilled!' });
    return;
  }

  try {
    const IsBannerExist = await bannerServices.checkForBanner({
      image: body.image,
    });

    if (IsBannerExist) {
      res.status(412).json({ message: 'The banner already exist' });
      return;
    }

    await bannerServices.addNewBanner(body);
    res.status(201).json({ message: 'New banner was successfully added!' });
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateBanner: RequestHandler = async (req, res) => {
  const body = req.body;
  const id = req.params.bannerId;

  const hasBodyEmptyFields = hasEmptyFields(BANNER_FORM_KEYS, body);

  if (hasBodyEmptyFields) {
    res.status(412).json({ message: 'Body is not correct fulfilled!' });
    return;
  }

  try {
    const IsBannerExist = await bannerServices.getBannerById(id);

    if (!IsBannerExist) {
      res.status(404).json({ message: 'Banner is not exist' });
      return;
    }

    const updatedBody = JSON.parse(
      JSON.stringify({ ...body, updatedAt: new Date() })
    );

    await bannerServices.updateBanner(id, updatedBody);
    res.status(200).json({ message: 'Banner was successfully updated!' });
  } catch (error) {
    res.status(404).json(error);
  }
};

const removeBanner: RequestHandler = async (req, res) => {
  const id = req.params.bannerId;

  try {
    await bannerServices.rmvBanner(id);

    res.status(200).json({ message: 'Banner was successfully removed!' });
  } catch (error) {
    res.status(404).json(error);
  }
};

export default {
  getAllBanners,
  getBannerById,
  updateBanner,
  removeBanner,
  addNewBanner,
};

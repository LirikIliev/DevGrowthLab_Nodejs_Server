import Banner from '../models/banner';
import { BannerModelDateType } from '../types/types';

const getAllBanners = () => Banner.find();
const addNewBanner = (newBannerData: BannerModelDateType) =>
  new Banner(newBannerData).save();
const getBannerById = (bannerId: string) => Banner.findById(bannerId);
const rmvBanner = (bannerId: string) => Banner.findByIdAndDelete(bannerId);

export default {
  getAllBanners,
  getBannerById,
  addNewBanner,
  rmvBanner,
};

import Banner from '../models/banner';
import { BannerModelDateType, MongooseSearchingType } from '../types/types';

const getAllBanners = () => Banner.find();
const addNewBanner = (newBannerData: BannerModelDateType) =>
  new Banner(newBannerData).save();
const checkForBanner = (data: MongooseSearchingType) =>
  Banner.IsBannerExist(data);
const updateBanner = (id: string, data: BannerModelDateType) =>
  Banner.findByIdAndUpdate(id, data, { runValidators: true });
const getBannerById = (bannerId: string) => Banner.findById(bannerId);
const rmvBanner = (bannerId: string) => Banner.findByIdAndDelete(bannerId);

export default {
  getAllBanners,
  getBannerById,
  addNewBanner,
  updateBanner,
  checkForBanner,
  rmvBanner,
};

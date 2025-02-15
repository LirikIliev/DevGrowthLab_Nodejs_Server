import Brand from '../models/brands';
import { BrandModelDateType, MongooseSearchingType } from '../types/types';

const getAllBrands = () => Brand.find();
const addNewBrand = (data: BrandModelDateType) => new Brand(data).save();
const updateBrand = (id: string, data: BrandModelDateType) =>
  Brand.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const checkBrand = (data: MongooseSearchingType) => Brand.IsBrandExist(data);
const getBrandById = (brandId: string) => Brand.findById(brandId);
const rmvBrand = (brandId: string) => Brand.findByIdAndDelete(brandId);

export default {
  getAllBrands,
  addNewBrand,
  updateBrand,
  getBrandById,
  rmvBrand,
  checkBrand,
};

import Brand from '../models/brands';
import { BrandModelDateType } from '../types/types';

const getAllBrands = () => Brand.find();
const addNewBrand = (data: BrandModelDateType) => new Brand(data).save();
const getBrandById = (brandId: string) => Brand.findById(brandId);
const removeBrand = (brandId: string) => Brand.findByIdAndDelete(brandId);

export default {
  getAllBrands,
  addNewBrand,
  getBrandById,
  removeBrand,
};

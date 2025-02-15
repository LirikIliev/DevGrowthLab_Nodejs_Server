import { Router } from 'express';

import paths from './config';
import brandHandler from '../controllers/brandService';

const router = Router();

router.get(paths.GET_BRANDS, brandHandler.getAllBrands);
router.post(paths.ADD_BRAND, brandHandler.addNewBrand);
router.put(paths.UPDATE_BRAND, brandHandler.updateBrand);
router.delete(paths.REMOVE_BRAND, brandHandler.removeBrand);

export default router;

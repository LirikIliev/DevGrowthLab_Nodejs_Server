import { Router } from 'express';

import paths from './config';
import brandHandler from '../controllers/brandService';

const router = Router();

router.get(paths.GET_BRANDS, brandHandler.getAllBrands);

export default router;

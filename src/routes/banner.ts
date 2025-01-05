import { Router } from 'express';

import bannerHandlers from '../controllers/bannerServices';
import ROUTE_PATH from './config';

const router = Router();

router.get(ROUTE_PATH.GET_BANNERS, bannerHandlers.getAllBanners);

export default router;

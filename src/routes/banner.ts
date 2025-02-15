import { Router } from 'express';

import bannerHandlers from '../controllers/bannerServices';
import ROUTE_PATH from './config';

const router = Router();

router.get(ROUTE_PATH.GET_BANNERS, bannerHandlers.getAllBanners);
router.post(ROUTE_PATH.ADD_BANNER, bannerHandlers.addNewBanner);
router.put(ROUTE_PATH.UPDATE_BANNER, bannerHandlers.updateBanner);
router.delete(ROUTE_PATH.REMOVE_BANNER, bannerHandlers.removeBanner);

export default router;

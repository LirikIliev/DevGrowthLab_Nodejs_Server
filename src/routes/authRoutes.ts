import { Router } from 'express';

import authHandler from '../controllers/authService';
import ROUTE_PATHS from './config';
const router = Router();
// POST => user login.
router.post(ROUTE_PATHS.LOGIN, authHandler.postLoginRequestHandler);
// POST => user registration.
router.post(ROUTE_PATHS.REGISTER, authHandler.postRegistrationRequestHandler);

export default router;

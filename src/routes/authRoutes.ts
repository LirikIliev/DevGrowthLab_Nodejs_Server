import { Router } from 'express';

import authHandler from '../controllers/authService';

const router = Router();
// POST => user login.
router.post('/auth/login', authHandler.postLoginRequestHandler);
// POST => user registration.
router.post('/auth/registration', authHandler.postRegistrationRequestHandler);

export default router;

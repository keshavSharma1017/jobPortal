import express from 'express';
import { register, login, logout, getProfile } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/profile', auth, getProfile);

export default router;
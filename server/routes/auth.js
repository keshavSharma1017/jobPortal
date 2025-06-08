import express from 'express';
import { register, login, logout, getProfile, updateProfile, refreshToken } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout); // No auth middleware needed for logout
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;
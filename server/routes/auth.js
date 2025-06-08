import express from 'express';
import { 
  register, 
  login, 
  logout, 
  getProfile, 
  updateProfile, 
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword
} from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes (require authentication)
router.post('/logout', logout); // No auth middleware needed for logout
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.post('/change-password', auth, changePassword);

export default router;
import express from 'express';
import {
  getAllJobs,
  getRecruiterJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  seedJobs
} from '../controllers/jobController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/', getAllJobs);
router.get('/seed', seedJobs); // Development route to seed sample data
router.get('/:id', getJobById);

// Protected routes (authentication required)
router.get('/my-jobs', auth, getRecruiterJobs);
router.post('/', auth, createJob);
router.put('/:id', auth, updateJob);
router.delete('/:id', auth, deleteJob);

export default router;
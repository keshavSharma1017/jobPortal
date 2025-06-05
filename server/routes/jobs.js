import express from 'express';
import {
  getAllJobs,
  getRecruiterJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/my-jobs', auth, getRecruiterJobs);

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Other protected routes
router.post('/', auth, createJob);
router.put('/:id', auth, updateJob);
router.delete('/:id', auth, deleteJob);

export default router;
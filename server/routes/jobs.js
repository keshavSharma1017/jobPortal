import express from 'express';
import JobPost from '../models/JobPost.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await JobPost.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET jobs posted by the logged-in recruiter
router.get('/my-jobs', auth, async (req, res) => {
  try {
    const jobs = await JobPost.find({ createdBy: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new job
router.post('/', auth, async (req, res) => {
  try {
    const newJob = new JobPost({
      ...req.body,
      createdBy: req.user.userId
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update job
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedJob = await JobPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE job
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedJob = await JobPost.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
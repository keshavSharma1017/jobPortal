import JobPost from '../models/JobPost.js';

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get jobs posted by recruiter
export const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find({ createdBy: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching recruiter jobs:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get single job
export const getJobById = async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new job
export const createJob = async (req, res) => {
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
};

// Update job
export const updateJob = async (req, res) => {
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
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await JobPost.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
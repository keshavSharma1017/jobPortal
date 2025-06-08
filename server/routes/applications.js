import express from 'express';
import Application from '../models/Application.js';
import auth from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// Get all applications for a job (Recruiter only)
router.get('/job/:jobId', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobId)) {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }

    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('userId', 'name email')
      .populate('jobId', 'title company');
      
    res.json(applications);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit a new application
router.post('/', auth, async (req, res) => {
  try {
    const { jobId, resume, coverLetter } = req.body;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }
    
    // Check if user already applied
    const existingApplication = await Application.findOne({
      jobId,
      userId: req.user.userId
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const newApplication = new Application({
      jobId,
      userId: req.user.userId,
      resume,
      coverLetter
    });
    
    const application = await newApplication.save();
    
    const populatedApplication = await Application.findById(application._id)
      .populate('jobId', 'title company')
      .populate('userId', 'name email');

    res.status(201).json(populatedApplication);
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's applications
router.get('/my-applications', auth, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.userId })
      .populate('jobId', 'title company location type')
      .sort({ createdAt: -1 });
      
    res.json(applications);
  } catch (error) {
    console.error('Error fetching user applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update application status (Recruiter only)
router.put('/:applicationId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const { applicationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: 'Invalid application ID format' });
    }

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const application = await Application.findById(applicationId)
      .populate('jobId', 'createdBy');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the current user is the recruiter who posted the job
    if (application.jobId.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    application.status = status;
    await application.save();

    const updatedApplication = await Application.findById(applicationId)
      .populate('userId', 'name email')
      .populate('jobId', 'title company');

    res.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
import mongoose from 'mongoose';

const jobPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    default: 'Full-time'
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const JobPost = mongoose.model('JobPost', jobPostSchema);

export default JobPost;
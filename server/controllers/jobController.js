import JobPost from '../models/JobPost.js';

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    console.log('Fetching all jobs...');
    const jobs = await JobPost.find().sort({ createdAt: -1 });
    console.log(`Found ${jobs.length} jobs`);
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get jobs posted by recruiter
export const getRecruiterJobs = async (req, res) => {
  try {
    console.log('Fetching recruiter jobs for user:', req.user.userId);
    const jobs = await JobPost.find({ createdBy: req.user.userId })
      .sort({ createdAt: -1 });
    console.log(`Found ${jobs.length} jobs for recruiter`);
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching recruiter jobs:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get single job
export const getJobById = async (req, res) => {
  try {
    console.log('Fetching job by ID:', req.params.id);
    const job = await JobPost.findById(req.params.id);
    if (!job) {
      console.log('Job not found');
      return res.status(404).json({ message: 'Job not found' });
    }
    console.log('Job found:', job.title);
    res.json(job);
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new job
export const createJob = async (req, res) => {
  try {
    console.log('Creating new job:', req.body);
    const newJob = new JobPost({
      ...req.body,
      createdBy: req.user.userId
    });
    const savedJob = await newJob.save();
    console.log('Job created successfully:', savedJob._id);
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update job
export const updateJob = async (req, res) => {
  try {
    console.log('Updating job:', req.params.id);
    const updatedJob = await JobPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedJob) {
      console.log('Job not found for update');
      return res.status(404).json({ message: 'Job not found' });
    }
    console.log('Job updated successfully');
    res.json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    console.log('Deleting job:', req.params.id);
    const deletedJob = await JobPost.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      console.log('Job not found for deletion');
      return res.status(404).json({ message: 'Job not found' });
    }
    console.log('Job deleted successfully');
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: error.message });
  }
};

// Seed some sample jobs (for development)
export const seedJobs = async (req, res) => {
  try {
    console.log('Seeding sample jobs...');
    
    // Check if jobs already exist
    const existingJobs = await JobPost.find();
    if (existingJobs.length > 0) {
      return res.json({ message: 'Jobs already exist', count: existingJobs.length });
    }

    const sampleJobs = [
      {
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        description: 'We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern JavaScript frameworks.',
        requirements: [
          '5+ years of experience with React.js',
          'Strong knowledge of HTML, CSS, and JavaScript',
          'Experience with state management (Redux, Context API)',
          'Familiarity with modern build tools (Webpack, Vite)',
          'Understanding of responsive design principles'
        ],
        createdBy: null // Will be set to a default user if needed
      },
      {
        title: 'Backend Developer',
        company: 'DataFlow Solutions',
        location: 'New York, NY',
        type: 'Full-time',
        description: 'Join our backend team to build scalable APIs and microservices. You will work with cutting-edge technologies to handle millions of requests per day.',
        requirements: [
          '3+ years of experience with Node.js',
          'Strong knowledge of databases (MongoDB, PostgreSQL)',
          'Experience with RESTful API design',
          'Knowledge of cloud platforms (AWS, GCP)',
          'Understanding of microservices architecture'
        ],
        createdBy: null
      },
      {
        title: 'Product Manager',
        company: 'Innovation Labs',
        location: 'Austin, TX',
        type: 'Full-time',
        description: 'Lead product strategy and development for our flagship products. Work closely with engineering, design, and marketing teams to deliver exceptional user experiences.',
        requirements: [
          '4+ years of product management experience',
          'Strong analytical and problem-solving skills',
          'Experience with agile development methodologies',
          'Excellent communication and leadership skills',
          'Background in technology or engineering preferred'
        ],
        createdBy: null
      },
      {
        title: 'UX/UI Designer',
        company: 'Creative Studio',
        location: 'Los Angeles, CA',
        type: 'Contract',
        description: 'Create beautiful and intuitive user interfaces for web and mobile applications. Collaborate with product and engineering teams to bring designs to life.',
        requirements: [
          '3+ years of UX/UI design experience',
          'Proficiency in Figma, Sketch, or Adobe XD',
          'Strong portfolio showcasing design process',
          'Understanding of user-centered design principles',
          'Experience with design systems and component libraries'
        ],
        createdBy: null
      },
      {
        title: 'DevOps Engineer',
        company: 'CloudTech Systems',
        location: 'Seattle, WA',
        type: 'Full-time',
        description: 'Build and maintain our cloud infrastructure. Implement CI/CD pipelines and ensure high availability and scalability of our systems.',
        requirements: [
          '4+ years of DevOps experience',
          'Strong knowledge of AWS or Azure',
          'Experience with Docker and Kubernetes',
          'Proficiency in Infrastructure as Code (Terraform, CloudFormation)',
          'Knowledge of monitoring and logging tools'
        ],
        createdBy: null
      }
    ];

    const createdJobs = await JobPost.insertMany(sampleJobs);
    console.log(`Created ${createdJobs.length} sample jobs`);
    
    res.status(201).json({ 
      message: 'Sample jobs created successfully', 
      count: createdJobs.length,
      jobs: createdJobs
    });
  } catch (error) {
    console.error('Error seeding jobs:', error);
    res.status(500).json({ message: error.message });
  }
};
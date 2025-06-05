import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/applications.js';
import adminRoutes from './routes/admin.js';

// Load env vars
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Job Portal API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});
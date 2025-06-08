import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../client/src/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../client/src/components/Layout/Navbar';
import Footer from '../client/src/components/Layout/Footer';
import Login from '../client/src/components/Auth/Login';
import Register from '../client/src/components/Auth/Register';
import JobList from '../client/src/components/JobSeeker/JobList';
import JobDetail from '../client/src/components/JobSeeker/JobDetail';
import AppliedJobs from '../client/src/components/JobSeeker/AppliedJobs';
import RecruiterDashboard from '../client/src/components/Recruiter/Dashboard';
import PostJob from '../client/src/components/Recruiter/PostJob';
import JobApplicants from '../client/src/components/Recruiter/JobApplicants';
import EditJob from '../client/src/components/Recruiter/EditJob';
import AdminDashboard from '../client/src/components/Admin/Dashboard';
import Profile from '../client/src/components/Profile/Profile';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<JobList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/applied-jobs" element={<AppliedJobs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
              <Route path="/recruiter/post-job" element={<PostJob />} />
              <Route path="/recruiter/jobs/:jobId/applicants" element={<JobApplicants />} />
              <Route path="/recruiter/jobs/:jobId/edit" element={<EditJob />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/\" replace />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer 
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
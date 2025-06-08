import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import JobList from './components/JobSeeker/JobList';
import JobDetail from './components/JobSeeker/JobDetail';
import AppliedJobs from './components/JobSeeker/AppliedJobs';
import RecruiterDashboard from './components/Recruiter/Dashboard';
import PostJob from './components/Recruiter/PostJob';
import JobApplicants from './components/Recruiter/JobApplicants';
import EditJob from './components/Recruiter/EditJob';
import AdminDashboard from './components/Admin/Dashboard';
import Profile from './components/Profile/Profile';
import './styles/index.css';
import './styles/auth.css';
import './styles/navbar.css';
import './styles/profile.css';
import './styles/job-detail.css';
import './styles/job-list.css';
import './styles/footer.css';

function App() {
  return (
    <AuthProvider>
      <Router>
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
              <Route path="*" element={<Navigate to="/" replace />} />
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
      </Router>
    </AuthProvider>
  );
}

export default App;
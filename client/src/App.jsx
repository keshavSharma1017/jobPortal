import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import JobList from './components/JobSeeker/JobList';
import JobDetail from './components/JobSeeker/JobDetail';
import AppliedJobs from './components/JobSeeker/AppliedJobs';
import RecruiterDashboard from './components/Recruiter/Dashboard';
import PostJob from './components/Recruiter/PostJob';
import JobApplicants from './components/Recruiter/JobApplicants';
import EditJob from './components/Recruiter/EditJob';
import AdminDashboard from './components/Admin/Dashboard';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/index.css';
import './styles/auth.css';
import './styles/navbar.css';
import './styles/profile.css';
import './styles/job-detail.css';
import './styles/job-list.css';
import './styles/footer.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<JobList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              
              {/* Protected routes for authenticated users */}
              <Route path="/applied-jobs" element={
                <ProtectedRoute>
                  <AppliedJobs />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* Recruiter-only routes */}
              <Route path="/recruiter/dashboard" element={
                <ProtectedRoute requiredRole="recruiter">
                  <RecruiterDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/recruiter/post-job" element={
                <ProtectedRoute requiredRole="recruiter">
                  <PostJob />
                </ProtectedRoute>
              } />
              
              <Route path="/recruiter/jobs/:jobId/applicants" element={
                <ProtectedRoute requiredRole="recruiter">
                  <JobApplicants />
                </ProtectedRoute>
              } />
              
              <Route path="/recruiter/jobs/:jobId/edit" element={
                <ProtectedRoute requiredRole="recruiter">
                  <EditJob />
                </ProtectedRoute>
              } />
              
              {/* Admin-only routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
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
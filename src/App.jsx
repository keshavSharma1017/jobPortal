import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../client/src/context/AuthContext';
import Navbar from '../client/src/components/Layout/Navbar';
import Footer from '../client/src/components/Layout/Footer';
import Login from '../client/src/components/Auth/Login';
import Register from '../client/src/components/Auth/Register';
import JobList from '../client/src/components/JobSeeker/JobList';
import JobDetail from '../client/src/components/JobSeeker/JobDetail';
import AppliedJobs from '../client/src/components/JobSeeker/AppliedJobs';
import RecruiterDashboard from '../client/src/components/Recruiter/Dashboard';
import AdminDashboard from '../client/src/components/Admin/Dashboard';
import '../client/src/styles/index.css';

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
              <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
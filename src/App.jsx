import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../client/src/context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import JobList from './components/JobSeeker/JobList';
import JobDetail from './components/JobSeeker/JobDetail';
import AppliedJobs from './components/JobSeeker/AppliedJobs';
import RecruiterDashboard from './components/Recruiter/Dashboard';
import AdminDashboard from './components/Admin/Dashboard';
import './styles/index.css';

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
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, User, Shield, FileText, LogOut, Settings } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="modern-nav">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <Briefcase size={28} />
          <span>Job Portal</span>
        </Link>
        
        <div className="nav-links">
          {user ? (
            <>
              <div className="nav-user-info">
                <span className="nav-user-name">Welcome, {user.name}</span>
                <span className="nav-user-role">{user.role}</span>
              </div>
              
              {user.role === 'recruiter' && (
                <Link to="/recruiter/dashboard" className="nav-link">
                  <User size={18} />
                  Dashboard
                </Link>
              )}
              
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className="nav-link">
                  <Shield size={18} />
                  Admin
                </Link>
              )}
              
              <Link to="/applied-jobs" className="nav-link">
                <FileText size={18} />
                My Applications
              </Link>
              
              <Link to="/profile" className="nav-link">
                <Settings size={18} />
                My Profile
              </Link>
              
              <button onClick={handleLogout} className="nav-link logout-btn">
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link login-link">
                Sign In
              </Link>
              <Link to="/register" className="nav-button">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
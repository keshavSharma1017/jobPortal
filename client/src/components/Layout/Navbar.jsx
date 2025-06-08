import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Job Portal
        </Link>
        
        <div className="nav-links">
          {user ? (
            <>
              {user.role === 'recruiter' && (
                <Link to="/recruiter/dashboard" className="nav-link">
                  Dashboard
                </Link>
              )}
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className="nav-link">
                  Admin
                </Link>
              )}
              <Link to="/applied-jobs" className="nav-link">
                My Applications
              </Link>
              <button onClick={handleLogout} className="nav-link">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
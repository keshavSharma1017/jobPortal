import { Link } from 'react-router-dom';
import { useAuth } from '../../../client/src/context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Job Portal</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <>
                {user.role === 'recruiter' && (
                  <Link to="/recruiter/dashboard\" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                    Dashboard
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                    Admin
                  </Link>
                )}
                <Link to="/applied-jobs" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  My Applications
                </Link>
                <button
                  onClick={logout}
                  className="ml-4 text-gray-600 hover:text-gray-900 px-3 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  Login
                </Link>
                <Link to="/register" className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
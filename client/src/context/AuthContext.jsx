import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser({ ...userData, token: savedToken });
      } catch (error) {
        clearAuthData();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
      const currentPath = location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        toast.info('Session expired. Please login again.');
      }
    };

    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, [location]);

  const clearAuthData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.clear();
  };

  const login = (userData) => {
    const { token, refreshToken, ...userInfo } = userData;
    
    setUser({ ...userInfo, token });
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('token', token);
    
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api'}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      // Ignore logout errors
    } finally {
      setUser(null);
      clearAuthData();
      
      navigate('/login', { replace: true });
      toast.success('Logged out successfully');
    }
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      isAuthenticated,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
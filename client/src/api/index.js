import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:5001/api',
  withCredentials: true,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
API.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
API.interceptors.response.use(
  (response) => {
    console.log(`Response received from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    
    if (error.response?.status === 401) {
      // Clear token and user data on unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.clear();
      // Force redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
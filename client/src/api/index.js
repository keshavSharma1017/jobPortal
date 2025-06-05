import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:5001/api',
  withCredentials: true
});

// Add a request interceptor
API.interceptors.request.use((config) => {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
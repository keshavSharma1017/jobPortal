import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:5001/api',
  withCredentials: true
});

// Add a request interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
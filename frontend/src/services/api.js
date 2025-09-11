import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5173/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/user/register', userData),
  login: (credentials) => api.post('/user/loginuser', credentials),
  logout: () => api.post('/user/logoutuser'),
};

// File API calls
export const fileAPI = {
  uploadFile: (formData) => api.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  getUserFiles: () => api.get('/file/files'),
  getFileSummary: (fileId, length = 'medium') => api.get(`/file/summary/${fileId}?length=${length}`),
};

export default api;

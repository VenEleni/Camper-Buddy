import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const authData = localStorage.getItem('auth');
  if (authData) {
    console.log('authData in axiosInstance:', authData);
    const { token } = JSON.parse(authData);
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default axiosInstance;

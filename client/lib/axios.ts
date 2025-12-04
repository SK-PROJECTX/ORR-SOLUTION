import axios from 'axios';

const api = axios.create({
  baseURL: 'https://orr-backend-web-latest.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': 'iqyFKg5sIleZH1GGlYvV2WoQ1Sa3xsmOjPUPKnZfQALgcpW0hIk9StV5j0T0XigX',
  },
  withCredentials: true,
});

const getCSRFToken = (): string | null => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      return decodeURIComponent(value);
    }
  }
  return null;
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
      config.headers['X-CSRFToken'] = 'iqyFKg5sIleZH1GGlYvV2WoQ1Sa3xsmOjPUPKnZfQALgcpW0hIk9StV5j0T0XigX';
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
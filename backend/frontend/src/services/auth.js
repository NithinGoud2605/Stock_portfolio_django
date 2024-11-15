import axios from 'axios';
import api from './api';

const API_URL = 'http://localhost:8000/auth/token/';

export const login = async (username, password) => {
  const response = await api.post('/auth/token/', { username, password });
  return response.data;
};

export const register = async (username, password) => {
  const response = await api.post('/register/', { username, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  localStorage.removeItem('user');
};

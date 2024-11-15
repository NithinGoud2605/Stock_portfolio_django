import axios from 'axios';

const API_URL = 'http://localhost:8000/auth/token/';

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    return response.data; // Access and refresh tokens
  } catch (error) {
    console.error('Login failed', error.response || error.message);
    throw error;
  }
};

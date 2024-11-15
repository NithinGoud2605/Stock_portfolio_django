import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { login } from '../services/auth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password); // Call login service
      if (data.access) {
        localStorage.setItem('access', data.access); // Store access token
        localStorage.setItem('refresh', data.refresh); // Store refresh token
        console.log('Login successful');
        navigate('/dashboard'); // Navigate to the dashboard
      } else {
        console.error('Login failed: Invalid response format');
      }
    } catch (error) {
      console.error('Login failed', error.message);
      setErrorMessage('Invalid username or password'); // Show error to user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

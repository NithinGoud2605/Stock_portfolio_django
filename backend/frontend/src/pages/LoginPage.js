import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/auth'; // Ensure both login and register are imported

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false); // Toggle between Login and Register modes
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('Invalid username or password.');
    }
  };
  

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      const data = await login(username, password); // Log in the user automatically after registration
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Form Container */}
      <div className="relative z-10 bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          {isRegisterMode ? 'Create an Account' : 'Welcome Back'}
        </h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={isRegisterMode ? handleRegisterSubmit : handleSubmit}>
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
            {isRegisterMode ? 'Register' : 'Login'}
          </button>
        </form>

        {/* Toggle Between Login and Register */}
        <button
          onClick={() => {
            setIsRegisterMode(!isRegisterMode);
            setErrorMessage(''); // Clear error messages when toggling modes
          }}
          className="text-blue-500 hover:underline mt-4 block w-full text-center"
        >
          {isRegisterMode
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

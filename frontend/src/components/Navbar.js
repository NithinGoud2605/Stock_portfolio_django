import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between">
        <h1 className="text-2xl font-bold">Stock Portfolio Tracker</h1>
        <button onClick={handleLogout} className="text-white hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

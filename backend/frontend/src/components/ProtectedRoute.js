import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('access');
  return accessToken ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

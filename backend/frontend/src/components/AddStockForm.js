import React, { useState } from 'react';
import api from '../services/api';

const AddStockForm = ({ onStockAdded }) => {
  const [formData, setFormData] = useState({
    stock: '',
    quantity: '',
    purchase_price: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    if (name === 'quantity' && value <= 0) {
      setError('Quantity must be greater than 0.');
    } else if (name === 'purchase_price' && value <= 0) {
      setError('Purchase price must be greater than 0.');
    } else {
      setError(null);
    }
  };

  const validateInputs = () => {
    if (!formData.stock.trim()) return 'Stock symbol is required.';
    if (!formData.quantity || formData.quantity <= 0) return 'Quantity must be greater than 0.';
    if (!formData.purchase_price || formData.purchase_price <= 0) return 'Purchase price must be greater than 0.';
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post('/portfolios/', {
        stock_symbol: formData.stock.trim(),
        quantity: parseFloat(formData.quantity),
        purchase_price: parseFloat(formData.purchase_price),
      });
      setSuccessMessage('Stock successfully added!');
      setFormData({ stock: '', quantity: '', purchase_price: '' });
      onStockAdded();
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Failed to add stock. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white shadow rounded p-4">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">
          Stock Symbol
        </label>
        <input
          type="text"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter stock symbol"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="quantity">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter quantity"
          min="1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="purchase_price">
          Purchase Price
        </label>
        <input
          type="number"
          id="purchase_price"
          name="purchase_price"
          value={formData.purchase_price}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter purchase price"
          min="0.01"
          step="0.01"
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}
      <button
        type="submit"
        className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add Stock'}
      </button>
    </form>
  );
};

export default AddStockForm;

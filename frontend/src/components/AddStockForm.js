import React, { useState } from 'react';
import api from '../services/api';

const AddStockForm = ({ onStockAdded }) => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('portfolio/', {
        stock: symbol,
        quantity,
        purchase_price: purchasePrice,
      });
      onStockAdded(); // Refresh portfolio data
      setSymbol('');
      setQuantity('');
      setPurchasePrice('');
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Stock</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Stock Symbol</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Purchase Price</label>
        <input
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Add Stock
      </button>
    </form>
  );
};

export default AddStockForm;

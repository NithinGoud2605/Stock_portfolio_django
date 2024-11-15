import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import api from '../services/api';
import Navbar from '../components/Navbar';
import AddStockForm from '../components/AddStockForm';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const [userData, setUserData] = useState(null); // User portfolio data
  const [loading, setLoading] = useState(true); // Loading state

  const fetchData = async () => {
    try {
      const response = await api.get('portfolio/summary/');
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Fetch every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-bold text-gray-700">Loading Dashboard...</p>
      </div>
    );
  }

  // Pie Chart Data: Portfolio Distribution
  const pieData = {
    labels: userData.top_performers.map((stock) => stock.name),
    datasets: [
      {
        data: userData.top_performers.map((stock) => parseFloat(stock.value.replace('$', '').replace(',', ''))),
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#2196F3', '#9C27B0'],
      },
    ],
  };

  // Line Chart Data: Portfolio Value Over Time (Example Data)
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio Value ($)',
        data: [120000, 125000, 123000, 130000, 135000, 140000], // Replace with real-time data
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Welcome, {userData.name}</h1>
          <p className="text-lg">Your portfolio is valued at ${userData.portfolio_value.toLocaleString()}.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Add Stock Form */}
        <section className="mb-8">
          <AddStockForm onStockAdded={fetchData} />
        </section>

        {/* Portfolio Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-bold mb-4">Total Portfolio Value</h2>
            <p className="text-3xl text-green-500 font-bold">
              ${userData.portfolio_value.toLocaleString()}
            </p>
          </div>

          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-bold mb-4">Top Performers</h2>
            <ul>
              {userData.top_performers.map((stock, index) => (
                <li key={index} className="flex justify-between text-gray-700">
                  <span>{stock.name}</span>
                  <span>{stock.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
            <ul>
              <li className="text-gray-700">Bought 10 shares of Stock A</li>
              <li className="text-gray-700">Sold 5 shares of Stock B</li>
              <li className="text-gray-700">Portfolio updated</li>
            </ul>
          </div>
        </section>

        {/* Charts Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-bold mb-4">Portfolio Distribution</h3>
              <Pie data={pieData} />
            </div>

            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-bold mb-4">Performance Over Time</h3>
              <Line data={lineData} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

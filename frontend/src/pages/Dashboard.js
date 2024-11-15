import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
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

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching user data
  useEffect(() => {
    setTimeout(() => {
      setUserData({
        name: 'John Doe',
        portfolioValue: 125000,
        portfolioDistribution: {
          labels: ['Technology', 'Finance', 'Healthcare', 'Energy'],
          data: [40, 25, 20, 15],
        },
        performanceOverTime: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [120000, 125000, 123000, 130000, 135000, 140000],
        },
        topPerformers: [
          { name: 'Stock A', value: '$50,000' },
          { name: 'Stock B', value: '$30,000' },
          { name: 'Stock C', value: '$25,000' },
        ],
      });
      setLoading(false);
    }, 1000); // Simulate 1-second delay
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-bold text-gray-700">Loading Dashboard...</p>
      </div>
    );
  }

  const pieData = {
    labels: userData.portfolioDistribution.labels,
    datasets: [
      {
        data: userData.portfolioDistribution.data,
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#2196F3'],
      },
    ],
  };

  const lineData = {
    labels: userData.performanceOverTime.labels,
    datasets: [
      {
        label: 'Portfolio Value Over Time ($)',
        data: userData.performanceOverTime.data,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Welcome, {userData.name}</h1>
          <p className="text-lg">Your portfolio is doing great!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Portfolio Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-bold mb-4">Total Portfolio Value</h2>
            <p className="text-3xl text-green-500 font-bold">
              ${userData.portfolioValue.toLocaleString()}
            </p>
          </div>

          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-bold mb-4">Top Performers</h2>
            <ul>
              {userData.topPerformers.map((stock, index) => (
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

        {/* Charts and Analytics */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Performance Analytics</h2>
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

        {/* Other Sections */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Other Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-bold">Account Settings</h3>
              <p className="text-gray-700">Manage your profile and preferences.</p>
            </div>

            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-bold">Support</h3>
              <p className="text-gray-700">Contact our support team for assistance.</p>
            </div>

            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-bold">News & Updates</h3>
              <p className="text-gray-700">Stay updated with the latest market news.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

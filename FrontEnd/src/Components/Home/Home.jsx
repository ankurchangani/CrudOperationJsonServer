import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Welcome to the Home Page</h1>
        <p className="text-gray-600 mb-8">Manage your data easily with our user-friendly interface.</p>
        
       

        <Link
          to="/form"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Data
        </Link>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Header Title */}
        <h1 className="text-2xl font-bold">My App</h1>

        {/* Navigation Buttons */}
        <div className="space-x-4">

          <Link to="/" className='px-4 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100 transition'>
            Home
          </Link>

          <Link to="/view" className='px-4 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100 transition'>
            ViewData
          </Link>
          <Link to="/recycle-bin" className="px-4 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100 transition">
            Recycle Bin
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;
  
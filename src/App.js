import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddEditSneaker from './pages/AddEditSneaker';
import SneakerDetail from './pages/SneakerDetail';
import Favorites from './pages/Favorites';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900 hover:text-gray-600">
                SneakerVault
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/favorites" className="text-gray-900 hover:text-gray-600">
                Favorites
              </Link>
              <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add Sneaker
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/add" element={<AddEditSneaker />} />
          <Route path="/edit/:id" element={<AddEditSneaker />} />
          <Route path="/sneaker/:id" element={<SneakerDetail />} />
        </Routes>
      </main>
    </div>
  );
}
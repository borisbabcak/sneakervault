import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              SneakerVault
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/favorites"
              className="flex items-center text-gray-600 hover:text-red-500 transition"
            >
              <FaHeart className="mr-1" />
              <span>Favorites</span>
            </Link>
            <Link
              to="/add"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add Sneaker
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
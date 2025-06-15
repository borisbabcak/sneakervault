import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isFavorite, toggleFavorite } from '../utils/favoritesHandler';

export default function SneakerCard({ sneaker }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(sneaker.id));
  }, [sneaker.id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavorites = toggleFavorite(sneaker.id);
    setFavorite(newFavorites.includes(sneaker.id));
  };

  return (
    <Link to={`/sneaker/${sneaker.id}`} className="block">
      <div className="bg-white p-4 rounded shadow hover:shadow-lg transition relative">
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${favorite ? 'text-red-500' : 'text-gray-400'}`}
            fill={favorite ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        
        <img
          src={sneaker.image || '/images/default.jpg'}
          alt={sneaker.name}
          className="h-40 object-contain w-full rounded"
        />
        <h3 className="text-lg font-semibold mt-2">{sneaker.name}</h3>
        <p className="text-sm text-gray-500">{sneaker.brand}</p>
        <div className="text-sm text-gray-700 mt-1">
          <p>Size: {sneaker.size}</p>
          <p>Price: {sneaker.price} €</p>
        </div>
      </div>
    </Link>
  );
}

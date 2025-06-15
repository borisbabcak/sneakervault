import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { isFavorite, toggleFavorite } from '../utils/favoritesHandler';

export default function SneakerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sneaker, setSneaker] = useState(null);
  const [error, setError] = useState('');
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    api.get(`/sneakers/${id}`)
      .then(res => setSneaker(res.data))
      .catch(err => setError('Failed to load sneaker details'));
    
    setFavorite(isFavorite(id));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this sneaker?')) {
      api.delete(`/sneakers/${id}`)
        .then(() => navigate('/'))
        .catch(err => setError('Failed to delete sneaker'));
    }
  };

  const handleFavoriteClick = () => {
    const newFavorites = toggleFavorite(id);
    setFavorite(newFavorites.includes(id));
  };

  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!sneaker) return <div className="p-4">Loading...</div>;

  const formattedDate = sneaker.purchaseDate
    ? new Date(sneaker.purchaseDate).toLocaleDateString('sk-SK')
    : 'No date provided';

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={sneaker.image || '/images/default.jpg'}
            alt={sneaker.name}
            className="w-full h-80 object-contain"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
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
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold">{sneaker.name}</h2>
          <p className="text-gray-500 text-lg">{sneaker.brand}</p>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <p><strong>Condition:</strong> {sneaker.condition}</p>
            <p><strong>Size:</strong> {sneaker.size}</p>
            <p><strong>Color:</strong> {sneaker.color}</p>
            <p><strong>Price:</strong> {sneaker.price} €</p>
            <p><strong>Purchase Date:</strong> {formattedDate}</p>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate(`/edit/${sneaker.id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
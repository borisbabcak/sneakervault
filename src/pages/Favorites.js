import { useState, useEffect } from 'react';
import api from '../api/axios';
import SneakerCard from '../components/SneakerCard';
import { getFavorites } from '../utils/favoritesHandler';

export default function Favorites() {
  const [sneakers, setSneakers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await api.get('/sneakers');
        const favoriteIds = getFavorites();
        const favoriteSneakers = response.data.filter(sneaker => 
          favoriteIds.includes(sneaker.id)
        );
        setSneakers(favoriteSneakers);
      } catch (err) {
        setError('Failed to load favorite sneakers');
      }
    };

    fetchSneakers();
  }, []);

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Sneakers</h1>
      {sneakers.length === 0 ? (
        <p className="text-gray-500">No favorite sneakers yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sneakers.map(sneaker => (
            <SneakerCard
              key={sneaker.id}
              sneaker={sneaker}
            />
          ))}
        </div>
      )}
    </div>
  );
} 
import { useState, useEffect } from 'react';
import api from '../api/axios';
import SneakerCard from '../components/SneakerCard';

export default function Home() {
  const [sneakers, setSneakers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/sneakers')
      .then(res => setSneakers(res.data))
      .catch(err => setError('Failed to load sneakers'));
  }, []);

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Sneaker Collection</h1>
      {sneakers.length === 0 ? (
        <p className="text-gray-500">No sneakers in your collection yet.</p>
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
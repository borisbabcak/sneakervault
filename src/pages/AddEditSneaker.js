import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

export default function AddEditSneaker() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    brand: '',
    size: '',
    color: '',
    price: '',
    condition: '',
    purchaseDate: '',
    image: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.get(`/sneakers/${id}`)
        .then(res => setForm(res.data));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `/sneakers/${id}` : '/sneakers';

      await api({
        method,
        url,
        data: form
      });
      
      navigate('/');
    } catch (err) {
      setError('Failed to save sneaker. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Edit' : 'Add'} sneakers</h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="size" placeholder="Size (EU)" value={form.size} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="color" placeholder="Color" value={form.color} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="price" placeholder="Price (€)" value={form.price} onChange={handleChange} className="w-full p-2 border rounded" />
        
        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select condition</option>
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Used">Used</option>
        </select>

        <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className="w-full p-2 border rounded" />
        
        <div className="space-y-2">
          <div className="p-4 bg-gray-50 rounded border">
            <p className="text-sm text-gray-600">
              Select an image from the <code className="bg-gray-200 px-1 rounded">public/images</code> folder:
            </p>
          </div>
          <input 
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setForm({ ...form, image: `/images/${file.name}` });
              }
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {isEdit ? 'Save changes' : 'Add'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
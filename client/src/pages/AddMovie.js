import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddMovie = () => {
  const [form, setForm] = useState({
    title: '',
    genre: '',
    description: '',
    poster_url: '',
    rating: ''
  });

  const navigate = useNavigate();
  const { id } = useParams(); // If we have an ID, we are Editing

  // If Editing: Fetch existing data
  useEffect(() => {
    if (id) {
      axios.get(`https://moviemania-rrp4.onrender.com/movies/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing movie (PUT)
        await axios.put(`http://localhost:5000/movies/${id}`, form);
      } else {
        // Add new movie (POST)
        await axios.post('http://localhost:5000/movies', form);
      }
      navigate('/'); // Go back home
    } catch (err) {
      alert("Error saving movie");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
          {id ? 'Edit Movie' : 'Add New Movie'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Movie Title</label>
            <input name="title" value={form.title} onChange={handleChange} required
              className="w-full p-3 border rounded focus:ring-2 focus:ring-red-400 outline-none" placeholder="e.g. Titanic" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Genre</label>
              <input name="genre" value={form.genre} onChange={handleChange} required
                className="w-full p-3 border rounded focus:ring-2 focus:ring-red-400 outline-none" placeholder="e.g. Romance" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Rating (0-10)</label>
              <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-red-400 outline-none" placeholder="e.g. 8.5" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Poster URL</label>
            <input name="poster_url" value={form.poster_url} onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-red-400 outline-none" placeholder="https://..." />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-red-400 outline-none" placeholder="Plot summary..."></textarea>
          </div>

          <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition duration-300">
            {id ? 'Update Movie' : 'Add Movie'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
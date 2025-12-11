import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://moviemania-rrp4.onrender.com/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!movie) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <img src={movie.poster_url} alt={movie.title} className="w-full md:w-1/2 object-cover" />
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-red-500">{movie.title}</h1>
          <p className="text-lg mb-2"><strong className="text-gray-400">Genre:</strong> {movie.genre}</p>
          <p className="text-lg mb-4"><strong className="text-gray-400">Rating:</strong> {movie.rating} / 10</p>
          <p className="text-gray-300 leading-relaxed mb-6">{movie.description}</p>

          <Link to="/" className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 text-center">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
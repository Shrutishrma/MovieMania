import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      const res = await axios.get('https://moviemania-rrp4.onrender.com/movies');
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to fetch movies. Is the Backend running?");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this movie?")) {
      try {
        await axios.delete(`http://localhost:5000/movies/${id}`);
        fetchMovies();
      } catch (err) {
        alert("Failed to delete movie");
      }
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase()) ||
    movie.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-10">

      {/* --- HERO SECTION WITH VIDEO --- */}
      <div className="relative w-full h-96 bg-black overflow-hidden">
        {/* Background Video */}
        <iframe
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50 pointer-events-none scale-125"
          src="https://www.youtube.com/embed/JfVOs4VSpmA?autoplay=1&mute=1&controls=0&loop=1&playlist=JfVOs4VSpmA&showinfo=0"
          title="Movie Trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        ></iframe>

        {/* Text Overlay (Z-Index ensures it sits ON TOP of video) */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className="text-6xl font-extrabold mb-4 drop-shadow-xl text-red-600 tracking-tighter">
            MOVIEMANIA
          </h1>
          <p className="text-2xl font-light tracking-widest drop-shadow-md bg-black bg-opacity-50 px-4 py-1 rounded">
            DIVE INTO CINEMATIC WORLDS
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            <strong>Error: </strong> {error}
          </div>
        )}

        {/* Search Input */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by title or genre..."
            className="w-full max-w-lg p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 shadow-sm transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 group flex flex-col">

              {/* Poster */}
              <div className="relative overflow-hidden h-80">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster' }} // Fallback image
                />
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800 leading-tight">{movie.title}</h2>
                    <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded shadow-sm">
                      {movie.rating} ★
                    </span>
                  </div>
                  <p className="text-sm text-red-500 font-semibold mb-2 uppercase tracking-wide">{movie.genre}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {movie.description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4 border-t pt-4">
                  <Link to={`/movie/${movie.id}`} className="text-green-600 hover:text-green-800 font-bold text-sm uppercase">
                    View
                  </Link>
                  <Link to={`/edit/${movie.id}`} className="text-blue-600 hover:text-blue-800 font-bold text-sm uppercase">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(movie.id)} className="text-red-600 hover:text-red-800 font-bold text-sm uppercase">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
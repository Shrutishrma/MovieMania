import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaCommentDots } from 'react-icons/fa'; // Importing Icons

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-600 tracking-wider uppercase">
          MovieMania
        </Link>
        
        {/* Nav Links with Icons */}
        <div className="flex space-x-6 font-semibold">
          <Link to="/" className="flex items-center hover:text-red-500 transition duration-300">
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/add" className="flex items-center hover:text-red-500 transition duration-300">
            <FaPlus className="mr-2" /> Add Movie
          </Link>
          <Link to="/feedback" className="flex items-center hover:text-red-500 transition duration-300">
            <FaCommentDots className="mr-2" /> Reviews
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
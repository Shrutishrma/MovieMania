import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddMovie from './pages/AddMovie';
import Feedback from './pages/Feedback';
import MovieDetail from './pages/MovieDetail'; // Import the new page

function App() {
  return (
    <Router>
      <div className="font-sans antialiased text-gray-900 bg-gray-100 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/edit/:id" element={<AddMovie />} />
          <Route path="/movie/:id" element={<MovieDetail />} /> {/* New Route */}
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
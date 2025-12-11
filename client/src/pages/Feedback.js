import { useState, useEffect } from 'react';

// Define the component clearly
const Feedback = () => {
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`);
        },
        () => {
          setLocation("Location access denied.");
        }
      );
    } else {
      setLocation("Geolocation not supported.");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback Submitted!\nLocation: ${location}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Viewer Reviews</h2>
        <div className="bg-yellow-100 p-3 rounded mb-6 text-yellow-800 text-sm">
          <strong>📍 User Location:</strong> {location}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Your Name" required className="w-full p-3 border rounded" />
          <input type="email" placeholder="Your Email" required className="w-full p-3 border rounded" />
          <input type="text" placeholder="Movie Title" required className="w-full p-3 border rounded" />
          <textarea placeholder="Write your review..." rows="3" className="w-full p-3 border rounded"></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

// Ensure this is the ONLY export
export default Feedback;
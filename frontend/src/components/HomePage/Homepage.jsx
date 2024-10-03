import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Homepage = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState(1);
  const [cars, setCars] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch cars from the backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getallagenciescars", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you use token-based auth
          },
        });
        const data = await response.json();
        setCars(data); // Set the cars fetched from backend
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  // Function to handle click and navigate to the car details page
  const handleCardClick = (carId) => {
    navigate(`/car/${carId}`); // Navigate to the car details page with the car ID
  };

  return (
    <div className="">
      {/* search component */}
      <div className="wrapper flex justify-center py-5">
        <div className="flex justify-center space-x-10 p-4 w-1/2 border border-1 border-gray-300 rounded-2xl shadow-lg">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
          />
          <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3">
            <option value="" disabled>
              Choose a city
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Search
          </button>
        </div>
      </div>

      {/* filters */}
      <div className="flex justify-center py-5">
        <div className="flex items-center p-4 bg-gray-100 rounded-xl shadow-xl space-x-14">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-xl"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">Max Price:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-xl"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-xl"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <button className="p-2 mt-5 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
            Apply Filters
          </button>
        </div>
      </div>

      {/* cards */}
      <div className="justify-center">
        <div className="grid grid-cols-3 gap-4 p-4">
          {cars.map((car) => (
            <div
              key={car.id}
              onClick={() => handleCardClick(car.id)} // Navigate when card is clicked
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <a href="#">
                <img
                  className="p-8 rounded-t-lg"
                  src={car.image || "https://via.placeholder.com/150"} // Use car image or a placeholder
                  alt={car.model}
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {car.brand} {car.model} ({car.year})
                  </h5>
                </a>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-800 dark:text-white">
                    ${car.dailyPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

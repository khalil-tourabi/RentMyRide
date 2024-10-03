import { useState, useEffect } from "react";

const Homepage = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState(1);
  const [cars, setCars] = useState([]);

  // Fetch cars from the backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getallagenciescars", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await response.json();
        setCars(data); // Set the cars fetched from backend
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search component */}
      <div className="wrapper flex justify-center py-5">
        <div className="flex justify-between space-x-6 p-4 w-3/4 bg-white border border-gray-300 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="Search for cars..."
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
            <option value="" disabled>
              Choose a city
            </option>
            <option value="option1">City 1</option>
            <option value="option2">City 2</option>
            <option value="option3">City 3</option>
          </select>
          <button className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Search
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-center py-6">
        <div className="flex items-center p-6 bg-white rounded-xl shadow-lg space-x-14">
          <div className="flex flex-col w-40">
            <label className="text-sm font-medium">Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. 100"
            />
          </div>
          <div className="flex flex-col w-40">
            <label className="text-sm font-medium">Max Price:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. 500"
            />
          </div>
          <div className="flex flex-col w-40">
            <label className="text-sm font-medium">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <button className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex justify-center px-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <a href="#">
                <img
                  className="p-6 rounded-t-lg object-cover h-48 w-full"
                  src={car.image || "https://via.placeholder.com/150"}
                  alt={car.model}
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                    {car.brand} {car.model} ({car.year})
                  </h5>
                </a>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-gray-800">
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity] = useState("");
  const [setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getallagenciescars", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setCars(data);
        setFilteredCars(data);
        const uniqueCities = [...new Set(data.map(car => car.agencyCity))];
        setCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = () => {
    let filtered = cars;

    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(car => car.agencyCity === selectedCity);
    }

    if (minPrice) {
      filtered = filtered.filter(car => car.dailyPrice >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(car => car.dailyPrice <= parseFloat(maxPrice));
    }

    setFilteredCars(filtered);
  };

  const handleCardClick = (carId) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div>
      <div className="wrapper flex justify-center py-5">
        <div className="flex justify-center space-x-10 p-4 w-1/2 border border-1 border-gray-300 rounded-2xl shadow-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by car model or brand..."
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-2/3"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Search
          </button>
        </div>
      </div>

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
          <button
            onClick={handleSearch}
            className="p-2 mt-5 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <div className="justify-center">
        <div className="grid grid-cols-3 gap-4 p-4">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              onClick={() => handleCardClick(car.id)}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <img
                className="p-8 rounded-t-lg"
                src={car.image || "https://via.placeholder.com/150"}
                alt={car.model}
              />
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {car.brand} {car.model} ({car.year})
                </h5>
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

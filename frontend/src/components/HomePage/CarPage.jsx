import { useParams } from "react-router-dom"; // Import useParams to get car ID from URL
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CarDetails = () => {
  const { carId } = useParams(); // Extract car ID from the route
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Fetch car details from the backend
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        console.log(carId);
        const response = await fetch(`http://localhost:3000/api/getonecar/${carId}`);
        const data = await response.json();
        console.log(data);
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [carId]);

  if (!car) {
    return <p>Loading...</p>; // Show a loading state while fetching data
  }

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg">
        {/* Car Image */}
        <div className="lg:w-1/2">
          <img
            src={car.image || "https://via.placeholder.com/150"} // Use car image or a placeholder
            alt={car.model}
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>

        {/* Car Details */}
        <div className="lg:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {car.brand} {car.model} ({car.year})
          </h2>
          <p className="text-lg font-semibold text-indigo-600 mt-2">
            {car.dailyPrice} DHs / day
          </p>

          {/* Renting Period */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Renting Period</h3>
            <div className="flex space-x-4 mt-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
            </div>
            <p className="mt-2 text-gray-600">
              Please select your renting period.
            </p>
            <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Book
            </button>
          </div>

          {/* Features Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="mt-2 list-disc list-inside text-gray-700">
              {car.features && car.features.length > 0 ? (
                car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))
              ) : (
                <li>No features listed</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        <div>
          {car.reviews && car.reviews.length > 0 ? (
            car.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 py-2">
                <p className="text-gray-800">{review.text}</p>
                <p className="text-yellow-500">Rating: {review.rating} ★</p>
              </div>
            ))
          ) : (
            <p>No reviews yet</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarDetails;

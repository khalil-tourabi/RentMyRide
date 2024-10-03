import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CarDetails = () => {
  const userType = localStorage.getItem("userType") || "";

  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [returnAddress, setReturnAddress] = useState("");
  const navigate = useNavigate();

  // Fetch car details from the backend
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/getonecar/${carId}`);
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [carId]);

  // Function to handle the book button click
  const handleBookClick = async () => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType") || "";
    const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

    // Check if user is logged in
    if (!token) {
      navigate("/login");
      return;
    }

    // Check if user is a CLIENT
    if (userType !== "CLIENT") {
      alert("Only clients can book a car.");
      return;
    }

    // Proceed with booking logic here
    try {
      const bookingData = {
        carId: car.id,
        renterId: userId, // The ID of the user who is booking
        startDate: startDate.toISOString(), // Convert date to ISO string
        endDate: endDate.toISOString(),
        deliveryAddress: deliveryAddress || "Default Delivery Address", // Customize or set default values
        returnAddress: returnAddress || "Default Return Address",
        deliveryTime: startDate, // Placeholder value for delivery time
        returnTime: endDate, // Placeholder value for return time
      };

      const response = await fetch("http://localhost:3000/api/bookcar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token for authentication
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const bookingResponse = await response.json();
        console.log("Booking successful:", bookingResponse);
        alert("Car booked successfully!");
      } else {
        const errorResponse = await response.json();
        console.error("Booking failed:", errorResponse);
        alert(errorResponse.error || "Failed to book the car.");
      }
    } catch (error) {
      console.error("Error booking car:", error);
    }
  };

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg">
        <div className="lg:w-1/2">
          <img
            src={car.image || "https://via.placeholder.com/150"}
            alt={car.model}
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>

        <div className="lg:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {car.brand} {car.model} ({car.year})
          </h2>
          <p className="text-lg font-semibold text-indigo-600 mt-2">
            {car.dailyPrice} DHs / day
          </p>

          {userType === "CLIENT" ? (
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

              <label className="block mt-4 text-sm font-medium text-gray-700">
                Delivery Address
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 mt-1"
              />

              <label className="block mt-4 text-sm font-medium text-gray-700">
                Return Address
              </label>
              <input
                type="text"
                value={returnAddress}
                onChange={(e) => setReturnAddress(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 mt-1"
              />

              <button
                onClick={handleBookClick}
                className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Book
              </button>
            </div>
          ) : (
            <p className="mt-4 text-red-600">Only clients can book cars.</p>
          )}

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

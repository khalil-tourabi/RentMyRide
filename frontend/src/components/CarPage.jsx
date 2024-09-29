import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CarDetails = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const reviews = [
    { id: 1, text: "Amazing car! Very comfortable and smooth ride.", rating: 5 },
    { id: 2, text: "Great experience. The car was in excellent condition.", rating: 4 },
    { id: 3, text: "Value for money. Will rent again!", rating: 5 },
  ];

  const features = [
    "Automatic Transmission",
    "Air Conditioning",
    "Bluetooth Connectivity",
    "GPS Navigation",
    "Rearview Camera",
  ];

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg">
        {/* Car Image */}
        <div className="lg:w-1/2">
          <img
            src="https://content.avito.ma/classifieds/images/10123498724?t=card"
            alt="Car"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>
        
        {/* Car Details */}
        <div className="lg:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-gray-900">2022 Ford Mustang</h2>
          <p className="text-lg font-semibold text-indigo-600 mt-2">99.00 DHs / day</p>

          {/* Renting Period */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Renting Period</h3>
            <div className="flex space-x-4 mt-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
            </div>
            <p className="mt-2 text-gray-600">Please select your renting period.</p>
            <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Book
            </button>
          </div>

          {/* Features Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="mt-2 list-disc list-inside text-gray-700">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        <div>
          {reviews.map(review => (
            <div key={review.id} className="border-b border-gray-200 py-2">
              <p className="text-gray-800">{review.text}</p>
              <p className="text-yellow-500">Rating: {review.rating} ★</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarDetails;

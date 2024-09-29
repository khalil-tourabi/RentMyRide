import { useState } from 'react';

const Filters = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState(1);

  return (
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
            <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      <button className="p-2 mt-5 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;

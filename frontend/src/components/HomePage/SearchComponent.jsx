
const SearchComponent = () => {
  return (
    <div className="flex justify-center space-x-10 p-4 w-1/2 border border-1 border-gray-300 rounded-2xl shadow-lg">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
      />
      <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3">
        <option value="" disabled>Choose a city</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Search
      </button>
    </div>
  );
};

export default SearchComponent;

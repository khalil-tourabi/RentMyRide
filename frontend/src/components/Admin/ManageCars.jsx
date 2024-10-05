const AdminCarsManagement = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Manage Cars</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4">
        Add New Car
      </button>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4">Car Model</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Availability</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-100">
            <td className="py-2 px-4">Toyota Camry</td>
            <td className="py-2 px-4">$50/day</td>
            <td className="py-2 px-4 text-green-600">Available</td>
            <td className="py-2 px-4">
              <button className="text-blue-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline ml-2">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminCarsManagement;

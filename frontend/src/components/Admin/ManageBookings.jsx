
const ManageBookings = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Manage Bookings</h1>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4">Car</th>
            <th className="py-2 px-4">User</th>
            <th className="py-2 px-4">Start Date</th>
            <th className="py-2 px-4">End Date</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample Data */}
          <tr className="border-b hover:bg-gray-100">
            <td className="py-2 px-4">Honda Accord</td>
            <td className="py-2 px-4">Jane Smith</td>
            <td className="py-2 px-4">2024-10-01</td>
            <td className="py-2 px-4">2024-10-07</td>
            <td className="py-2 px-4 text-green-600">Confirmed</td>
            <td className="py-2 px-4">
              <button className="text-blue-600 hover:underline">View</button>
              <button className="text-red-600 hover:underline ml-2">Cancel</button>
            </td>
          </tr>
          {/* More rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;


const AdminDashboard = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="block p-2 hover:bg-gray-700 rounded">
              Dashboard
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2 hover:bg-gray-700 rounded">
              Manage Cars
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2 hover:bg-gray-700 rounded">
              Manage Bookings
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2 hover:bg-gray-700 rounded">
              User Management
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-700 rounded">
              Settings
            </a>
          </li>
        </ul>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Dashboard Overview</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add New Car
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-lg">Total Cars</h2>
            <p className="text-3xl">150</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-lg">Total Bookings</h2>
            <p className="text-3xl">85</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-lg">Total Users</h2>
            <p className="text-3xl">250</p>
          </div>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="font-bold text-xl mb-4">Recent Bookings</h2>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4">Car</th>
                <th className="py-2 px-4">User</th>
                <th className="py-2 px-4">Start Date</th>
                <th className="py-2 px-4">End Date</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">Toyota Camry</td>
                <td className="py-2 px-4">John Doe</td>
                <td className="py-2 px-4">2024-09-30</td>
                <td className="py-2 px-4">2024-10-05</td>
                <td className="py-2 px-4 text-green-600">Confirmed</td>
              </tr>
              <tr className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">Honda Accord</td>
                <td className="py-2 px-4">Jane Smith</td>
                <td className="py-2 px-4">2024-10-01</td>
                <td className="py-2 px-4">2024-10-07</td>
                <td className="py-2 px-4 text-red-600">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

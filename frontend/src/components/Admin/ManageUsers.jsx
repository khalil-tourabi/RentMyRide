
const UserManagement = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">User Management</h1>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample Data */}
          <tr className="border-b hover:bg-gray-100">
            <td className="py-2 px-4">John Doe</td>
            <td className="py-2 px-4">john@example.com</td>
            <td className="py-2 px-4">Admin</td>
            <td className="py-2 px-4">
              <button className="text-blue-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline ml-2">Delete</button>
            </td>
          </tr>
          {/* More rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;

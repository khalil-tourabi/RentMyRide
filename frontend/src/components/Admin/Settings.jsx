const AdminSettings = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Settings</h1>
      <form className="bg-white rounded shadow p-4">
        <div className="mb-4">
          <label className="block text-gray-700">Site Title</label>
          <input
            type="text"
            className="mt-1 block w-full border rounded p-2"
            placeholder="RentMyRide"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Admin Email</label>
          <input
            type="email"
            className="mt-1 block w-full border rounded p-2"
            placeholder="admin@example.com"
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;

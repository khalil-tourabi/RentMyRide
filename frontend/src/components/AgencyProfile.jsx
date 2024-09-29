import { useEffect, useState } from 'react';
import axios from 'axios';

const AgencyProfile = () => {
  const [agency, setAgency] = useState(null);
  const [cars, setCars] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    agencyName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  });

  // Fetch agency profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch agency, cars, and reviews from API
        const agencyResponse = await axios.get('/api/agency');
        const carsResponse = await axios.get(`/api/cars/agency/${agencyResponse.data.id}`);
        const reviewsResponse = await axios.get(`/api/reviews/agency/${agencyResponse.data.id}`);

        setAgency(agencyResponse.data);
        setCars(carsResponse.data);
        setReviews(reviewsResponse.data);
        setFormData({
          agencyName: agencyResponse.data.name,
          email: agencyResponse.data.email,
          phone: agencyResponse.data.phone,
          address: agencyResponse.data.address,
          city: agencyResponse.data.city,
          country: agencyResponse.data.country,
          zipCode: agencyResponse.data.zipCode,
        });
      } catch (error) {
        console.error('Error fetching agency data:', error);
      }
    };
    fetchData();
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile update
  const handleUpdate = async () => {
    try {
      await axios.put(`/api/agency/${agency.id}`, formData);
      setIsEditing(false);
      // Optionally refetch profile data
    } catch (error) {
      console.error('Error updating agency profile:', error);
    }
  };

  if (!agency) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Agency Profile Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Agency Profile</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Agency Information */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-4">Agency Information</h3>
        {isEditing ? (
          <div className="grid grid-cols-2 gap-4">
            <input
              className="p-2 border border-gray-300 rounded"
              name="agencyName"
              value={formData.agencyName}
              onChange={handleChange}
              placeholder="Agency Name"
            />
            <input
              className="p-2 border border-gray-300 rounded"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              className="p-2 border border-gray-300 rounded"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            <input
              className="p-2 border border-gray-300 rounded"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <input
              className="p-2 border border-gray-300 rounded"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
            <input
              className="p-2 border border-gray-300 rounded"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
            <input
              className="p-2 border border-gray-300 rounded"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Zip Code"
            />
            <button
              className="col-span-2 bg-green-500 text-white py-2 px-4 rounded mt-4"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div>
            <p><strong>Agency Name:</strong> {agency.name}</p>
            <p><strong>Email:</strong> {agency.email}</p>
            <p><strong>Phone:</strong> {agency.phone}</p>
            <p><strong>Address:</strong> {agency.address}</p>
            <p><strong>City:</strong> {agency.city}</p>
            <p><strong>Country:</strong> {agency.country}</p>
            <p><strong>Zip Code:</strong> {agency.zipCode}</p>
          </div>
        )}
      </div>

      {/* Car Listings */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-4">Cars Available for Rent</h3>
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="border-b border-gray-300 py-2">
              <p><strong>Car:</strong> {car.brand} {car.model}</p>
              <p><strong>Price:</strong> ${car.dailyPrice}/day</p>
              <p><strong>Location:</strong> {car.location}</p>
              <p><strong>Status:</strong> {car.status}</p>
            </div>
          ))
        ) : (
          <p>No cars available at the moment.</p>
        )}
      </div>

      {/* Reviews Statistics */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        {reviews.length > 0 ? (
          <div>
            <p><strong>Total Reviews:</strong> {reviews.length}</p>
            <p><strong>Average Rating:</strong> {(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(2)}/5</p>
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-300 py-2">
                <p><strong>Car:</strong> {review.car.brand} {review.car.model}</p>
                <p><strong>Rating:</strong> {review.rating}/5</p>
                <p><strong>Comment:</strong> {review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default AgencyProfile;

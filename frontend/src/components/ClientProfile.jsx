import { useEffect, useState } from 'react';
import axios from 'axios';

const ClientProfile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    idNumber: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user, profile, bookings, and reviews from API
        const userResponse = await axios.get('/api/user');
        const profileResponse = await axios.get(`/api/profile/${userResponse.data.id}`);
        const bookingsResponse = await axios.get(`/api/bookings/user/${userResponse.data.id}`);
        const reviewsResponse = await axios.get(`/api/reviews/user/${userResponse.data.id}`);

        setUser(userResponse.data);
        setProfile(profileResponse.data);
        setBookings(bookingsResponse.data);
        setReviews(reviewsResponse.data);
        setFormData({
          username: userResponse.data.username,
          email: userResponse.data.email,
          phone: userResponse.data.phone,
          firstName: profileResponse.data.firstName,
          lastName: profileResponse.data.lastName,
          idNumber: profileResponse.data.idNumber,
          address: profileResponse.data.address,
          city: profileResponse.data.city,
          country: profileResponse.data.country,
          zipCode: profileResponse.data.zipCode
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
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
      await axios.put(`/api/profile/${user.id}`, formData);
      setIsEditing(false);
      // Optionally refetch profile data
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Client Profile</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        {isEditing ? (
          <div className="grid grid-cols-2 gap-4">
            <input
              className="p-2 border border-gray-300 rounded"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
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
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              className="p-2 border border-gray-300 rounded"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              className="p-2 border border-gray-300 rounded"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="ID Number"
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
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>First Name:</strong> {profile.firstName}</p>
            <p><strong>Last Name:</strong> {profile.lastName}</p>
            <p><strong>ID Number:</strong> {profile.idNumber}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>City:</strong> {profile.city}</p>
            <p><strong>Country:</strong> {profile.country}</p>
            <p><strong>Zip Code:</strong> {profile.zipCode}</p>
          </div>
        )}
      </div>

      {/* Booking History */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-4">Booking History</h3>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="border-b border-gray-300 py-2">
              <p><strong>Car:</strong> {booking.car.brand} {booking.car.model}</p>
              <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          ))
        ) : (
          <p>No booking history available.</p>
        )}
      </div>

      {/* Reviews */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Your Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-300 py-2">
              <p><strong>Car:</strong> {review.car.brand} {review.car.model}</p>
              <p><strong>Rating:</strong> {review.rating}/5</p>
              <p><strong>Comment:</strong> {review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default ClientProfile;

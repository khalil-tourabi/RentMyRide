import { useEffect, useState } from "react";
import axios from "axios";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/api/getuserbookings/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <h3 className="text-xl font-semibold mb-4">Booking History</h3>
      {bookings.length > 0 ? (
        <table className="min-w-full text-center">
          <thead>
            <tr>
              <th className="border-b">Car</th>
              <th className="border-b">Start Date</th>
              <th className="border-b">End Date</th>
              <th className="border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b">
                <td>{booking.car.brand} {booking.car.model}</td>
                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No booking history available.</p>
      )}
    </div>
  );
};

export default BookingHistory;

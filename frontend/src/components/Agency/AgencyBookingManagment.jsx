import { useEffect, useState } from "react";
import axios from "axios";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      const userId = localStorage.getItem("userId"); // Get userId from localStorage
      const token = localStorage.getItem("token"); // Get token from localStorage
      try {
        const response = await axios.get(`http://localhost:3000/api/getbookingbyagency`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { userId }, // Send userId as a query parameter
        });

        setBookings(response.data); // Update state with the fetched bookings
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleView = (booking) => {
    setCurrentBooking(booking);
    setIsViewModalOpen(true);
  };

  const handleCancel = (booking) => {
    setCurrentBooking(booking);
    setIsCancelModalOpen(true);
  };

  const confirmCancelBooking = () => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === currentBooking.id
          ? { ...booking, status: "Canceled" }
          : booking
      )
    );
    setIsCancelModalOpen(false);
    setIsViewModalOpen(false);
    setCurrentBooking(null);
  };

  const confirmBooking = () => {
    alert("Booking confirmed!");
    setIsViewModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Manage Bookings</h1>
      <table className="min-w-full bg-white rounded shadow text-center">
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
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{booking.car.model}</td>
              <td className="py-2 px-4">{booking.renter.username}</td>
              <td className="py-2 px-4">{booking.startDate}</td>
              <td className="py-2 px-4">{booking.endDate}</td>
              <td className="py-2 px-4 text-green-600">
                {booking.status === "Canceled" ? (
                  <span className="text-red-600">{booking.status}</span>
                ) : (
                  booking.status
                )}
              </td>
              <td className="py-2 px-4">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleView(booking)}
                >
                  View
                </button>
                <button
                  className="text-red-600 hover:underline ml-2"
                  onClick={() => handleCancel(booking)}
                  disabled={booking.status === "Canceled"}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Booking Details Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
            {currentBooking && (
              <>
                <p><strong>Car:</strong> {currentBooking.car.model}</p>
                <p><strong>User:</strong> {currentBooking.renter.username}</p>
                <p><strong>Start Date:</strong> {currentBooking.startDate}</p>
                <p><strong>End Date:</strong> {currentBooking.endDate}</p>
                <p><strong>Status:</strong> {currentBooking.status}</p>
                <p><strong>Total Amount:</strong> {currentBooking.totalAmount}</p>
                <p><strong>Payment Method:</strong> {currentBooking.paymentMethod}</p>
                <p><strong>Delivery Address:</strong> {currentBooking.deliveryAddress}</p>
                <p><strong>Return Address:</strong> {currentBooking.returnAddress}</p>
              </>
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={confirmBooking}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => handleCancel(currentBooking)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel Booking
              </button>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={confirmCancelBooking}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;

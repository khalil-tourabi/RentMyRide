import { useEffect, useState } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/api/getuserreviews/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Your Reviews</h3>
      {reviews.length > 0 ? (
        <table className="min-w-full text-center">
          <thead>
            <tr>
              <th className="border-b">Car</th>
              <th className="border-b">Rating</th>
              <th className="border-b">Comment</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b">
                <td>{review.car.brand} {review.car.model}</td>
                <td>{review.rating} / 5</td>
                <td>{review.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default Reviews;

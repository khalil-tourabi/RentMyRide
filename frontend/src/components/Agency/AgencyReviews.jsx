
const reviewsData = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    review: "Fantastic service! The car was in excellent condition, and the process was seamless.",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    review: "Great experience overall, but the pickup could have been a bit quicker.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 5,
    review: "Highly recommend! Very professional and friendly staff.",
  },
  // Add more reviews as needed
];

const AgencyReviews = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Customer Reviews</h1>
      <div className="space-y-4">
        {reviewsData.map((review) => (
          <div key={review.id} className="bg-white rounded shadow p-4">
            <div className="flex items-center mb-2">
              <div className="text-yellow-500">
                {[...Array(review.rating)].map((_, index) => (
                  <span key={index} className="text-lg">&#9733;</span> // Star icon
                ))}
                {[...Array(5 - review.rating)].map((_, index) => (
                  <span key={index} className="text-lg text-gray-300">&#9733;</span> // Empty star
                ))}
              </div>
              <h2 className="ml-2 font-semibold">{review.name}</h2>
            </div>
            <p className="text-gray-700">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgencyReviews;

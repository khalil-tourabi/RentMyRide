
const AboutUs = () => {
  return (
    <section className="py-10 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About RentMyRide</h1>
        <p className="text-lg text-gray-700 mb-8">
          At RentMyRide, we believe that every journey should be memorable and hassle-free. 
          Our mission is to provide exceptional car rental services tailored to your needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Our Story</h2>
            <p className="text-gray-700">
              Founded in 2022, RentMyRide has quickly become a trusted name in car rentals. 
              Our passion for cars and commitment to customer satisfaction drive us to offer the best.
            </p>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Our Values</h2>
            <p className="text-gray-700">
              Integrity, reliability, and excellence define who we are. We strive to exceed 
              expectations by providing quality vehicles and unparalleled service to our customers.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-center text-gray-700 mx-auto max-w-xl">
            <li className="mb-2">Wide selection of vehicles for every need.</li>
            <li className="mb-2">Flexible rental terms tailored to your schedule.</li>
            <li className="mb-2">Transparent pricing with no hidden fees.</li>
            <li className="mb-2">24/7 customer support to assist you at any time.</li>
            <li className="mb-2">Commitment to safety and cleanliness in all our vehicles.</li>
          </ul>
        </div>
        
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Us</h2>
          <p className="text-gray-700 mb-4">
            Whether you&apos;re traveling for business or pleasure, RentMyRide is here to make 
            your journey seamless. Experience the freedom of the open road with us!
          </p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

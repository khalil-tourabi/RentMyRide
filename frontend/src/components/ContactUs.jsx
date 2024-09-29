
const ContactUs = () => {
  return (
    <section className="py-10 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-8">
          We&apos;re here to help! Reach out to us for any inquiries or assistance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Get in Touch</h2>
            <form>
              <div className="mb-4">
                <label className="block text-left text-gray-700" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-left text-gray-700" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-left text-gray-700" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 rounded-md p-2"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-2"><strong>Email:</strong> support@rentmyride.com</p>
            <p className="text-gray-700 mb-2"><strong>Phone:</strong> +1 (234) 567-890</p>
            <p className="text-gray-700 mb-2"><strong>Address:</strong> 123 RentMyRide St, City, State, 12345</p>
            
            <h3 className="text-lg font-semibold text-gray-800 mt-6">Follow Us</h3>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="text-indigo-600 hover:text-indigo-700">Facebook</a>
              <a href="#" className="text-indigo-600 hover:text-indigo-700">Twitter</a>
              <a href="#" className="text-indigo-600 hover:text-indigo-700">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

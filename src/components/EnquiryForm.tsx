const EnquiryForm = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Enquiry Form
        </h1>

        <form className="space-y-4 text-left">
          {/* Name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-gray-700 mb-1 font-medium text-left"
            >
              Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-700 mb-1 font-medium text-left"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="text-gray-700 mb-1 font-medium text-left"
            >
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="number"
              required
              placeholder="Enter your phone number"
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-gray-700 mb-1 font-medium text-left"
            >
              Message
            </label>
            <textarea
              name="message"
              placeholder="Write your message..."
              rows={4}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;

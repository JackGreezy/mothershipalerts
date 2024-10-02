function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 font-poppins mb-4 leading-loose">
          Book your favorite{" "}
          <span className="text-blue-500 animate-pulse">comic ticket</span>{" "}
          fast! 🚀
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          Join the journey and get early access to exclusive releases!
        </p>
      </header>

      {/* Form Section */}
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Email Field */}
        <div className="mb-6 text-center">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder=""
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Number Field */}
        <div className="mb-6 text-center">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder=""
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Comic Selection */}
        <div className="mb-6 text-center">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Your Favorite Comics
          </label>
          <div className="flex flex-col items-start">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600 mr-2" />
              Comic 1: The Space Adventures
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600 mr-2" />
              Comic 2: The Alien Encounters
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600 mr-2" />
              Comic 3: Time Warp Chronicles
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600 mr-2" />
              Comic 4: Galactic Battlefields
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default App;

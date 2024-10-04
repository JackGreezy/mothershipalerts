import React, { useState } from "react";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [preferences, setPreferences] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      zipCode,
      preferences,
    };
  
    // Send the data to the backend API (Update the URL to your backend)
    fetch("http://localhost:5000/api/users", {  // Make sure this matches your backend URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Show a success message, you can display an alert or update the UI here
        alert("User data submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, display an error message to the user
        alert("Error submitting user data. Please try again.");
      });
  };
  

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
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        {/* First Name */}
        <div className="mb-6 text-center">
          <label
            htmlFor="firstName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-6 text-center">
          <label
            htmlFor="lastName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-6 text-center">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Phone Number Field */}
        <div className="mb-6 text-center">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Zip Code Field */}
        <div className="mb-6 text-center">
          <label
            htmlFor="zipCode"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Preferences */}
        <div className="mb-6 text-center">
          <label
            htmlFor="preferences"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Preferences
          </label>
          <textarea
            id="preferences"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your preferences here..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import './App.css'; 

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [preferences, setPreferences] = useState("");
  const [consentEmail, setConsentEmail] = useState(false);
  const [consentPhone, setConsentPhone] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const rotatingList = ["KILL TONY", "Shane Gillis", "Joe Rogan", "Matt McCusker", "Donnell Rawlings", "Tim Dillon", "Stavros Halkias"];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate the list every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % rotatingList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for checkboxes
    if (!consentEmail && !consentPhone) {
      setError("Please consent to either email or phone communication.");
      return;
    }

    const userData = {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      zipCode,
      preferences,
      consentEmail,
      consentPhone,
    };

    // Send the data to the backend API
    fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("User data submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error submitting user data. Please try again.");
      });
  };

  // Toggle the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-6xl font-extrabold tracking-wider mb-4">Comedy Mothership Email List</h1>
        <p className="text-xl leading-relaxed max-w-lg mx-auto">
          Sign up below and receive communication when a new Comedy Mothership show is released to have a better chance of buying tickets before they sell out!
        </p>
        <p className="text-2xl mt-4">
          Sick of missing out on seeing{" "}
          <span className="text-blue-400 animate-fadeInOut">{rotatingList[currentIndex]}</span>?
        </p>
      </header>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        {/* Input Fields */}
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

        {/* Communication Consent */}
        <div className="mb-6 text-left">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={consentEmail}
              onChange={(e) => setConsentEmail(e.target.checked)}
              className="form-checkbox text-blue-500"
            />
            <span className="ml-2 text-gray-700">I consent to receive communication via email.</span>
          </label>
          <br />
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={consentPhone}
              onChange={(e) => setConsentPhone(e.target.checked)}
              className="form-checkbox text-blue-500"
            />
            <span className="ml-2 text-gray-700">I consent to receive communication via phone.</span>
          </label>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Subscribe
        </button>
      </form>

      {/* Privacy Policy Modal Trigger (Outside of the form) */}
      <div className="mb-4 text-center text-gray-600 text-sm mt-4">
        By clicking "Subscribe", you agree to our{" "}
        <button onClick={toggleModal} className="underline text-blue-500">
          Privacy Policy
        </button>.
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-w-lg mx-auto relative">
            <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <p className="text-gray-700">
              At Comedy Mothership, we are committed to respecting and protecting your privacy. We collect and use your data 
              for the purpose of keeping you informed about new show releases, ticket opportunities, and exclusive events. 
              Occasionally, we may share your information with trusted third-party partners who assist us in providing these 
              services or who offer promotions that we believe may be of interest to you. Rest assured, any third parties with 
              whom we share your data are carefully vetted to ensure they comply with strict privacy and security standards. 
              You have full control over your data and may opt out of communications or request the removal of your data at any 
              time by contacting us.
            </p>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="w-full py-4 mt-12 text-center text-white bg-gray-800">
        <p className="mb-2">&copy; 2024 Comedy Mothership. All rights reserved.</p>
        <div className="flex justify-center items-center space-x-4">
          <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-white">
            <i className="fab fa-linkedin-in"></i> LinkedIn
          </a>
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-white">
            <i className="fab fa-github"></i> GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;

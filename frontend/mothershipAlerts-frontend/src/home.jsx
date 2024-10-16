import React, { useState, useEffect } from "react";

function Home () {

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [emailAddress, setEmailAddress] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [zipCode, setZipCode] = useState("");
const [consentEmail, setConsentEmail] = useState(false);
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

  // const recaptchaToken = grecaptcha.getResponse(); // Get reCAPTCHA token

  // if (!recaptchaToken) {
  //   alert('Please complete the CAPTCHA');
  //   return;
  // }

  // Validation for checkboxes
  if (!consentEmail) {
    setError("Please consent to email communication.");
    return;
  }

  // Basic validation
  if (!/^\d{10}$/.test(phoneNumber)) {
    setError("Phone number must be exactly 10 digits.");
    return;
  }

  if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
    setError("Zip code must be 5 digits or 5+4 digits.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
    setError("Please enter a valid email address.");
    return;
  }

  // Clear error after validation passes
  setError("");

  const userData = {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    zipCode,
    consentEmail,
  };

  // Send the data to the backend API
  fetch("https://mothershipalerts.com/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        setError(data.error);  // Display the server's error message
      } else {
        alert("User data submitted successfully!");
        setError("");  // Clear the error after success
      }
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

return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-semibold tracking-tight text-gray-800 mb-6">Comedy Mothership Email List</h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600 leading-7">
          Sign up to get notified about new Comedy Mothership shows and grab tickets before they sell out!
        </p>
        <p className="text-2xl mt-4 font-medium text-indigo-600">
          Don’t miss your chance to see {" "}
          <span className="text-black font-semibold">{rotatingList[currentIndex]}</span>!
        </p>
      </header>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-10 rounded-3xl shadow-lg w-full max-w-xl"
      >
        {/* Input Fields */}
        <div className="mb-6">
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="zipCode"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Communication Consent */}
        <div className="mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={consentEmail}
              onChange={(e) => setConsentEmail(e.target.checked)}
              className="form-checkbox text-indigo-600"
            />
            <span className="text-gray-700">I consent to receive communication via email.</span>
          </label>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          Subscribe
        </button>
      </form>

      {/* Privacy Policy Modal Trigger */}
      <div className="text-center text-gray-500 text-sm mt-4">
        By clicking "Subscribe", you agree to our{" "}
        <button onClick={toggleModal} className="underline text-indigo-500">
          Privacy Policy
        </button>.
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white p-8 rounded-xl shadow-lg z-10 max-w-lg mx-auto relative">
            <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Privacy Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              At Mothership Alerts, we respect your privacy. We collect and use your data solely for notifying you about 
              new shows and ticket releases. Occasionally, we share this information with trusted third-party partners 
              for promotional purposes. You can opt out at any time by contacting us at info@mothershipalerts.com.
            </p>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="w-full py-8 mt-12 bg-gray-900 text-center text-white">
        <p className="mb-2">&copy; 2024 Mothership Alerts. All rights reserved.</p>
        <div className="flex justify-center items-center space-x-4">
          <a href="https://www.linkedin.com/in/jack-greenberg-968885280/" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-white transition">
            <i className="fab fa-linkedin-in"></i> LinkedIn
          </a>
          <a href="https://github.com/JackGreezy" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-white transition">
            <i className="fab fa-github"></i> GitHub
          </a>
        </div>
      </footer>
    </div>
    );
}

export default Home;
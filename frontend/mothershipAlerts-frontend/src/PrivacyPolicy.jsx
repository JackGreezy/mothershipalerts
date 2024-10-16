import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          We are committed to protecting your privacy. This privacy policy explains how we collect, use, and share your information when you use our service.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
        <p className="mb-4">
          When you sign up for our service, we collect personal information such as your name, email, and phone number. This information is used to send you notifications about upcoming shows and events.
        </p>
        <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
        <p className="mb-4">
          We use your personal information solely to provide you with notifications about shows and to improve our services. We do not share your personal information with third parties.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, modify, or delete your personal information at any time. Please contact us if you have any concerns about your data.
        </p>
        <Link to="/" className="text-blue-500 underline mt-4">
          Return to Home Page
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

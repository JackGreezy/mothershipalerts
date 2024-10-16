import React, { useState } from 'react';

function Unsubscribe() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleUnsubscribe = async (e) => {
        e.preventDefault();
    
        try {
            // Send the unsubscribe request
            await fetch('"https://mothershipalerts.com/api/unsubscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            setMessage('If the email exists, you will be unsubscribed.');
        } catch (error) {
            console.error('Error unsubscribing:', error);
            setMessage('If the email exists, you will be unsubscribed.');
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Unsubscribe from Emails</h1>

            <form onSubmit={handleUnsubscribe} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-300"
                >
                    Unsubscribe
                </button>
            </form>

            {message && (
                <p className="text-center text-red-500 mt-4">{message}</p>
            )}
        </div>
    );
}

export default Unsubscribe;

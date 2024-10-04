from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# Connect to MongoDB
client = MongoClient("mongodb+srv://jackagreenberg:A7m0rKlYHO4lkdcl@supplements.z7ma0.mongodb.net/?retryWrites=true&w=majority&appName=Supplementsg")  # For MongoDB Atlas
db = client["comedy_shows_db"]  # Change to your DB name
users_collection = db["users"]  # Collection for user data

# API route to handle form data submission
@app.route('/api/users', methods=['POST'])
def add_user():
    try:
        # Get the data from the request
        user_data = request.json

        # Insert the data into MongoDB
        users_collection.insert_one(user_data)

        # Return a success response
        return jsonify({"message": "User data saved successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)

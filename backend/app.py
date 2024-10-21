from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from mongo_utils import remove_user_email_from_mongo
import os
from dotenv import load_dotenv
load_dotenv()

MONGO_USERNAME = os.getenv("MONGO_USERNAME")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
MONGO_CLUSTER_URL = os.getenv("MONGO_CLUSTER_URL")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

app = Flask(__name__)
# Enable CORS for all routes and any origin
CORS(app, resources={r"/*": {"origins": "*"}})


# MongoDB connection and routes...

# Connect to MongoDB
connection_string = f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_CLUSTER_URL}/?retryWrites=true&w=majority&appName={MONGO_DB_NAME}"
client = MongoClient(connection_string, ssl=True)
db = client["comedy_shows_db"]  # Change to your DB name
users_collection = db["users"]  # Collection for user data

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response

#Basic API Route 
@app.route('/')
def home():
    return "Welcome to the Comedy Mothership API"

# API route to handle form data submission
@app.route('/api/users', methods=['POST'])
def add_user():
    try:
        # Attempt to parse the JSON data
        user_data = request.json
        if not user_data:
            return jsonify({"error": "Invalid or missing JSON data"}), 400

        # Extract fields
        email = user_data.get('emailAddress')
        print(email)
        phone = user_data.get('phoneNumber')
        print(phone)

        # Check if required fields are present
        if not email:
            return jsonify({"error": "Missing required fields: 'emailAddress' required"}), 400

        # Check if email or phone already exists in the collection
        if users_collection.find_one({"emailAddress": email}):
            return jsonify({"error": "Email already exists"}), 400

        # Insert the data into MongoDB if no duplicate is found
        users_collection.insert_one(user_data)

        # Return a success response
        return jsonify({"message": "User data saved successfully!"}), 201
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# API route to handle unsubscribe requests
@app.route('/api/unsubscribe', methods=['POST'])
def unsubscribe():
    try:
        # Attempt to parse the JSON data
        data = request.json
        if not data:
            return jsonify({"success": False, "error": "Invalid or missing JSON data"}), 400

        email = data.get('email')
        if not email:
            return jsonify({"success": False, "error": "No email provided"}), 400

        # Call the function to remove email from the database
        removed = remove_user_email_from_mongo(email)

        if removed:
            return jsonify({"success": True, "message": "Successfully unsubscribed"}), 200
        else:
            return jsonify({"success": False, "error": "Email not found"}), 404
    except Exception as e:
        return jsonify({"success": False, "error": f"An error occurred: {str(e)}"}), 500


# Necessary for local development, not production
if __name__ == '__main__':
    app.run(debug=True)
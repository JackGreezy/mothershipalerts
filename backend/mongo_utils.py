from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from datetime import datetime, timezone
import os
from dotenv import load_dotenv
load_dotenv()

MONGO_USERNAME = os.getenv("MONGO_USERNAME")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
MONGO_CLUSTER_URL = os.getenv("MONGO_CLUSTER_URL")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

# Define a method to convert Show objects to dictionaries
def show_to_dict(show):
    return {
        "title": show.title,
        "formatted_date": show.formatted_date,
        "room": show.room,
        "url": show.url,
        "image_url": show.image_url,
        "description": show.description
    }

# Initialize MongoDB connection
def connect_to_mongo():
    try:
    # Replace the following with your own connection string
        connection_string = f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_CLUSTER_URL}/?retryWrites=true&w=majority&appName={MONGO_DB_NAME}"
        print(connection_string)
        client = MongoClient(connection_string, ssl=True)
        print(client.list_database_names())  # This will raise an error if the connection fails
        return client
    except ConnectionFailure as e:
        print(f"Connection failed: {e}")
        return None

# Save the list of shows to MongoDB
def save_shows_to_mongo(shows):
    client = connect_to_mongo()
    db = client["comedy_shows_db"]  # Name of your database
    collection = db["shows"]  # Name of your collection

    # Convert list of Show objects to list of dictionaries
    shows_data = [show_to_dict(show) for show in shows]

    # Insert the list of shows into the collection
    result = collection.insert_many(shows_data)

    # Print the IDs of inserted documents
    print(f"Inserted show IDs: {result.inserted_ids}")


def get_shows_from_mongo():
    client = connect_to_mongo()
    db = client["comedy_shows_db"]
    collection = db["shows"]
    
    shows = collection.find()  # Get all documents in the collection
    return shows

def get_show_urls_from_mongo():
    client = connect_to_mongo()
    if not client:
        print("Failed to connect to MongoDB")
        return []
    
    db = client["comedy_shows_db"]
    collection = db["shows"]
    
    urls = []
    try:
        shows = collection.find({}, {"url": 1, "_id": 0})
        urls = [show["url"] for show in shows]
    except Exception as e:
        print(f"Error fetching show URLs: {e}")
    
    return urls



# Function to remove shows with a date older than the current date and time
def remove_old_shows():
    client = connect_to_mongo()
    db = client["comedy_shows_db"]  # Replace with your database name
    collection = db["shows"]  # Replace with your collection name
    
    current_time = datetime.now(timezone.utc)  # Ensure timezone awareness
    
    # Query: find and delete documents where 'formatted_date' is older than 'current_time'
    result = collection.delete_many({"formatted_date": {"$lt": current_time}})
    
    print(f"Removed {result.deleted_count} old shows from MongoDB")


def clear_shows_collection():
    # Connect to MongoDB
    client = connect_to_mongo()
    db = client["comedy_shows_db"]
    collection = db["shows"]
    # Delete all documents in the 'shows' collection
    collection.delete_many({})

    print("All documents in the 'shows' collection have been deleted.")

def get_user_emails_from_mongo():
    # Connect to the MongoDB Client
    client = connect_to_mongo()
    db = client['comedy_shows_db']
    collection = db['users']

    # Find all user emails
    emails = []
    users = collection.find({}, {"emailAddress": 1, "_id": 0})  # Fetch 'emailAddress' field from documents
    for user in users:
        if 'emailAddress' in user:
            emails.append(user['emailAddress'])  # Make sure to match the key exactly

    client.close()  # Always close the connection
    return emails

def remove_user_email_from_mongo(email):
    client = connect_to_mongo()
    db = client['comedy_shows_db']
    collection = db['users']
    
    # Delete the document with the specified email
    result = collection.delete_one({"emailAddress": email})
    
    if result.deleted_count > 0:
        print(f"Successfully removed email: {email}")
        return True
    else:
        print(f"Email not found: {email}")
        return False
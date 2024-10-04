from pymongo import MongoClient
from datetime import datetime

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
    # Replace the following with your own connection string
    client = MongoClient("mongodb+srv://jackagreenberg:A7m0rKlYHO4lkdcl@supplements.z7ma0.mongodb.net/?retryWrites=true&w=majority&appName=Supplementsg")  # For MongoDB Atlas
    return client

# Save the list of shows to MongoDB
def save_shows_to_mongo(shows):
    client = connect_to_mongo()
    db = client["comedy_shows_db"]  # Name of your database
    collection = db["shows"]  # Name of your collection

    # Convert list of Show objects to list of dictionaries
    shows_data = [show_to_dict(show) for show in shows.show_list]

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
    db = client["comedy_shows_db"]
    collection = db["shows"]
    
    # Find all documents and retrieve only the 'url' field
    shows = collection.find({}, {"_id": 0, "url": 1})  # Projection: Exclude _id, include only 'url'
    
    # Extract URLs into a list
    url_list = [show['url'] for show in shows if 'url' in show]
    
    return url_list


# Function to remove shows with a date older than the current date and time
def remove_old_shows():
    client = connect_to_mongo()
    db = client["comedy_shows_db"]  # Replace with your database name
    collection = db["shows"]  # Replace with your collection name
    
    current_time = datetime.now()
    
    # Query: find and delete documents where 'date_time' is older than 'current_time'
    result = collection.delete_many({"date_time": {"$lt": current_time}})
    
    print(f"Removed {result.deleted_count} old shows from MongoDB")


def clear_shows_collection():
    # Connect to MongoDB
    client = MongoClient("mongodb://localhost:27017/")  # Update with your connection string
    db = client["comedy_shows_db"]  # Replace with your database name
    collection = db["shows"]  # Replace with your collection name

    # Delete all documents in the 'shows' collection
    collection.delete_many({})

    print("All documents in the 'shows' collection have been deleted.")

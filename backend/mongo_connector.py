# backend/mongo_connector.py

import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env file

# Get MongoDB connection string and DB name from environment
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("MONGO_DB_NAME")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db["clients"]

# Sample function to fetch clients with optional filter
def find_clients(query={}):
    try:
        return list(collection.find(query, {"_id": 0}))
    except Exception as e:
        print(f"[ERROR] MongoDB query failed: {str(e)}")
        return {"error": str(e)}

import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

try:
    client = MongoClient(MONGO_URI)
    print("[✅] Databases:", client.list_database_names())
except Exception as e:
    print("[❌] MongoDB connection error:", e)

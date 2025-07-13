import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("MONGO_DB_NAME")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db["clients"]

clients = [
    {
        "name": "Vikram Joshi",
        "address": "Delhi, India",
        "risk_appetite": "High",
        "investments": [
            {"stock_name": "TCS", "value": 3000000},
            {"stock_name": "Axis Bank", "value": 4000000}
        ]
    },
    {
        "name": "Ravi Kapoor",
        "address": "Mumbai, India",
        "risk_appetite": "Medium",
        "investments": [
            {"stock_name": "Infosys", "value": 1500000},
            {"stock_name": "TCS", "value": 800000}
        ]
    }
]

collection.insert_many(clients)
print("[✅] Client profiles inserted into MongoDB successfully.")

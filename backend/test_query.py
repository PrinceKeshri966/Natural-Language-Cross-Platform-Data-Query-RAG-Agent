from mongo_connector import find_clients

# Find all high-risk clients
results = find_clients({"risk_appetite": "High"})
print(results)

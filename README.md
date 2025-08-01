# 💼 Natural Language Wealth Query RAG Agent

This project is an AI-powered wealth management assistant that allows users to query financial insights using **natural language**. It leverages LangChain, MongoDB, MySQL, and OpenAI to retrieve data about client profiles and investment transactions.

---

## 📊 Tech Stack

- **Frontend**: ReactJS (TailwindCSS)
- **Backend**: Python (FastAPI / Flask)
- **Database**:
  - **MongoDB** for client profiles
  - **MySQL** for transaction data
- **LLM & RAG**: OpenAI + LangChain

---

## 📁 Folder Structure

wealth-query-agent/
├── backend/
│ ├── main.py # API server
│ ├── langchain_agent.py # LLM-powered query handler
│ ├── mongo_connector.py # MongoDB connector
│ ├── mysql_connector.py # MySQL connector
│ ├── config.py # Configuration for DBs
│ └── mongo_data_insert.py # MongoDB sample data
├── frontend/
│ └── src/components/
│ └── WealthQueryInterface.jsx

yaml
Copy
Edit

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/wealth-query-agent.git
cd wealth-query-agent
2. Setup MySQL
Create and insert transaction data into the wealth_transactions database:

sql
Copy
Edit
USE wealth_transactions;

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100),
    portfolio_id VARCHAR(50),
    relationship_manager VARCHAR(100),
    stock_name VARCHAR(100),
    value DECIMAL(12,2),
    date DATE
);

INSERT INTO transactions (client_name, portfolio_id, relationship_manager, stock_name, value, date) VALUES
-- For top 5 portfolios & portfolio totals
('Amit Sharma', 'P001', 'Rajiv Mehra', 'TCS', 5000000.00, CURDATE() - INTERVAL 10 DAY),
('Neha Singh', 'P001', 'Rajiv Mehra', 'Infosys', 3000000.00, CURDATE() - INTERVAL 4 DAY),
('Raj Malhotra', 'P002', 'Sneha Rao', 'Reliance', 7000000.00, CURDATE() - INTERVAL 2 DAY),
('Pooja Patel', 'P002', 'Sneha Rao', 'HDFC Bank', 2000000.00, CURDATE() - INTERVAL 5 DAY),
('Vikram Joshi', 'P003', 'Anil Sinha', 'ICICI', 8000000.00, CURDATE() - INTERVAL 3 DAY),
('Anjali Gupta', 'P004', 'Anil Sinha', 'Wipro', 1000000.00, CURDATE()),
('Ravi Kapoor', 'P004', 'Anil Sinha', 'Infosys', 1500000.00, CURDATE() - INTERVAL 1 DAY),
('Mohit Verma', 'P005', 'Neha Bansal', 'Tata Steel', 6000000.00, CURDATE() - INTERVAL 6 DAY),
('Sneha Dubey', 'P006', 'Neha Bansal', 'Zomato', 2500000.00, CURDATE() - INTERVAL 7 DAY),
('Tina Agarwal', 'P007', 'Sneha Rao', 'Adani', 3000000.00, CURDATE() - INTERVAL 3 DAY),

-- Client invested most
('Vikram Joshi', 'P003', 'Anil Sinha', 'Axis Bank', 4000000.00, CURDATE() - INTERVAL 1 DAY),
('Vikram Joshi', 'P003', 'Anil Sinha', 'TCS', 3000000.00, CURDATE() - INTERVAL 2 DAY),

-- Investments made in last 7 days
('Riya Sharma', 'P008', 'Rajiv Mehra', 'HCL', 1200000.00, CURDATE()),
('Riya Sharma', 'P008', 'Rajiv Mehra', 'HDFC', 1300000.00, CURDATE() - INTERVAL 3 DAY),
('Ravi Kapoor', 'P004', 'Anil Sinha', 'TCS', 800000.00, CURDATE() - INTERVAL 5 DAY);
3. Setup MongoDB
Use the following Python script to insert sample client profiles:

python
Copy
Edit
# mongo_data_insert.py

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
Run it using:

bash
Copy
Edit
python backend/mongo_data_insert.py
🚀 How to Run the Project
✅ Step 1: Run the Backend
bash
Copy
Edit
cd backend
python main.py
✅ Step 2: Run the Frontend
bash
Copy
Edit
cd frontend
npm install
npm start
Make sure your .env is correctly set up for MongoDB URI and MySQL credentials.

🎯 Functionality Mapping
Query Type	Data Source
Client profiles, risk appetite, stocks	MongoDB
Transaction amounts, dates, portfolios	MySQL
Cross-entity queries (via LLM)	Mixed

🧠 Sample Natural Queries You Can Ask
"List all high risk clients"

"Which clients invested in TCS?"

"What are the top 5 portfolios?"

"Give me breakup of portfolio values per relationship manager"

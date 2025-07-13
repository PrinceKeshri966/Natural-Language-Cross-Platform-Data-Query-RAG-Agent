from config import MYSQL_CONFIG
from mongo_connector import find_clients
from mysql_connector import run_mysql_query
import re

def process_query(user_query):
    try:
        print("[INFO] User query:", user_query.lower())

        # 🔍 MongoDB: Client profiles
        if any(word in user_query.lower() for word in ["client", "risk", "preference", "address", "invested in", "stock", "list all clients"]):
            if "high risk" in user_query.lower():
                return find_clients({"risk_appetite": "High"})

            elif "low risk" in user_query.lower():
                return find_clients({"risk_appetite": "Low"})

            elif "medium risk" in user_query.lower():
                return find_clients({"risk_appetite": "Medium"})

            elif "invested in" in user_query.lower() or "stock" in user_query.lower():
                match = re.search(r"(stock|invested in)\s+([a-zA-Z0-9\s]+)", user_query.lower())
                stock = match.group(2).strip() if match else ""
                return find_clients({"investments.stock_name": {"$regex": stock, "$options": "i"}})

            elif "list all clients" in user_query.lower():
                return find_clients({})

            else:
                return find_clients({})  # Default to return all profiles

        # 📊 MySQL: Transactional queries

        elif "top 5 portfolios" in user_query.lower():
            sql = """
                SELECT portfolio_id, SUM(value) AS total_value
                FROM transactions
                GROUP BY portfolio_id
                ORDER BY total_value DESC
                LIMIT 5;
            """
            return run_mysql_query(sql)

        elif "portfolio values per relationship manager" in user_query.lower():
            sql = """
                SELECT relationship_manager, SUM(value) AS total_value
                FROM transactions
                GROUP BY relationship_manager;
            """
            return run_mysql_query(sql)

        elif "top relationship managers" in user_query.lower():
            sql = """
                SELECT relationship_manager, COUNT(DISTINCT client_name) AS client_count
                FROM transactions
                GROUP BY relationship_manager
                ORDER BY client_count DESC
                LIMIT 5;
            """
            return run_mysql_query(sql)

        elif "clients are the highest holders of" in user_query.lower():
            match = re.search(r"holders of ([a-zA-Z0-9\s]+)", user_query.lower())
            stock = match.group(1).strip() if match else ""
            return find_clients({"investments.stock_name": {"$regex": stock, "$options": "i"}})

        elif "investments made in the last 7 days" in user_query.lower():
            sql = """
                SELECT * FROM transactions
                WHERE date >= CURDATE() - INTERVAL 7 DAY;
            """
            return run_mysql_query(sql)

        elif "each portfolio invested" in user_query.lower():
            sql = """
                SELECT portfolio_id, SUM(value) AS total_investment
                FROM transactions
                GROUP BY portfolio_id;
            """
            return run_mysql_query(sql)

        # 🧠 Optional fallback: LLM response if no rule matches
        else:
            return {"note": "Query not recognized. Try rephrasing or use keywords like 'client', 'portfolio', or 'stock'."}

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return {"error": str(e)}

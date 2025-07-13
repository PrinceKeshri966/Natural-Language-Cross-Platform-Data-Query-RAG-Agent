# backend/mysql_connector.py

import mysql.connector
from config import MYSQL_CONFIG
from decimal import Decimal

def run_mysql_query(query):
    conn = mysql.connector.connect(**MYSQL_CONFIG)
    cursor = conn.cursor(dictionary=True)
    cursor.execute(query)
    result = cursor.fetchall()
    conn.close()

    # Convert Decimal to float for JSON serialization
    for row in result:
        for key, value in row.items():
            if isinstance(value, Decimal):
                row[key] = float(value)

    return result

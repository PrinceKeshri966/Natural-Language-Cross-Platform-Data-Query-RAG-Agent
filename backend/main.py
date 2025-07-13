from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_agent import process_query

app = Flask(__name__)
CORS(app)

@app.route("/query", methods=["POST"])
def handle_query():
    data = request.get_json()
    user_query = data.get("query", "")
    result = process_query(user_query)
    return jsonify({"data": result})

if __name__ == "__main__":
    app.run(port=5000, debug=True)

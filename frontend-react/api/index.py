import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

client = OpenAI(
    api_key=os.getenv("AZURE_API_KEY"),
    base_url=os.getenv("AZURE_ENDPOINT").rstrip("/") + "/openai/v1/"
)


@app.route("/")
@app.route("/api")
@app.route("/api/")
def home():
    return "Chatbot Backend is Running!"


@app.route("/chat", methods=["POST"])
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    response = client.responses.create(
        model="gpt-5",
        input=user_message
    )

    return jsonify({
        "response": response.output_text
    })
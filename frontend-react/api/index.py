import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

azure_endpoint = os.getenv("AZURE_ENDPOINT")
azure_api_key = os.getenv("AZURE_API_KEY")

client = OpenAI(
    api_key=azure_api_key,
    base_url=azure_endpoint.rstrip("/") + "/openai/v1/"
)


@app.route("/")
def home():
    return "Chatbot Backend is Running!"


@app.route("/chat", methods=["POST"])
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
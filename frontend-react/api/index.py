import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
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
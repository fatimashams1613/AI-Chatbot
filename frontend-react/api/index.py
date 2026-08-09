import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

AZURE_API_KEY = os.getenv("AZURE_API_KEY")
AZURE_ENDPOINT = os.getenv("AZURE_ENDPOINT")
AZURE_MODEL = os.getenv("AZURE_MODEL")

if not AZURE_API_KEY:
    raise RuntimeError("AZURE_API_KEY is missing")

if not AZURE_ENDPOINT:
    raise RuntimeError("AZURE_ENDPOINT is missing")

if not AZURE_MODEL:
    raise RuntimeError("AZURE_MODEL is missing")

client = OpenAI(
    api_key=AZURE_API_KEY,
    base_url=AZURE_ENDPOINT.rstrip("/") + "/openai/v1/"
)


@app.route("/")
@app.route("/api")
@app.route("/api/")
def home():
    return jsonify({
        "status": "online",
        "message": "Chatbot Backend is Running!"
    })


@app.route("/chat", methods=["POST"])
@app.route("/api/chat", methods=["POST"])
def chat():

    try:
        data = request.get_json(silent=True) or {}
        user_message = data.get("message", "").strip()

        if not user_message:
            return jsonify({
                "error": "Message is required"
            }), 400

        response = client.responses.create(
            model=AZURE_MODEL,
            input=user_message
        )

        return jsonify({
            "response": response.output_text
        })

    except Exception as e:
        print("CHAT ERROR:", str(e))

        return jsonify({
            "error": "AI request failed",
            "details": str(e)
        }), 500
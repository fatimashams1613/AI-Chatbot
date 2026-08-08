import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@app.route("/")
def home():
    return "Chatbot Backend is Running!"


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    response = client.responses.create(
        model="gpt-5",
        input=user_message
    )

    return jsonify({
        "response": response.output_text
    })


if __name__ == "__main__":
    app.run()
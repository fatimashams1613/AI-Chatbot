import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

app = Flask(__name__)
CORS(app)

client = OpenAI(
    base_url=os.getenv("AZURE_ENDPOINT"),
    api_key=os.getenv("AZURE_API_KEY")
)

DEPLOYMENT_NAME = "gpt-5"

@app.route("/")
def home():
    return "Chatbot Backend is Running!"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    response = client.responses.create(
        model= "gpt-5",
        input=user_message
    )

    return jsonify({
        "response": response.output_text
    })

if __name__ == "__main__":
    app.run(debug=True)
import os
from dotenv import load_dotenv
from flask import Flask, render_template, jsonify, request
import google.generativeai as genai

load_dotenv()
app = Flask(__name__)
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

gemini_chat = model.start_chat(
    history=[
        {"role": "user", "parts": "Hola. Tengamos una conversación como si fuésemos mejores amigos."},
        {"role": "model", "parts": "Ok."},
    ]
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json["message"]
    response = gemini_chat.send_message(user_message)
    return jsonify({"response": response.text})


if __name__ == "__main__":
    app.run(port=int(os.environ.get('PORT', 80)))

from flask import Flask, request, jsonify, render_template
from llm import get_response  # Importing get_response function from llm.py
import os


app = Flask(__name__, template_folder='templates')




@app.route('/')
def index():
    return render_template('index.html')

# API route to process the user's question
@app.route('/process_question', methods=['POST'])
def process_question():
    data = request.json
    user_question = data.get('question')
    if not user_question:
        return jsonify({'answer': 'No question provided.'})

    # Send question to LLM via llm.py and get response
    answer = get_response(user_question)  # LLM function to get response

    return jsonify({'answer': answer})  # Send answer back to frontend

if __name__ == '__main__':
    app.run(debug=True)

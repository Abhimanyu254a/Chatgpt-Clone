from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process_question', methods=['POST'])
def process_question():
    data = request.get_json()
    question = data.get('question')
    # Your processing logic here, e.g., generate a response
    answer = f"Processed answer for: {question}"
    
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
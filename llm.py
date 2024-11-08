import os
import google.generativeai as genai

# Set up the API with the environment variable
genai.configure(api_key=os.environ["api_key"])

# Define the function to handle the chat session and get a response
def get_response(question, history=None):
    # Initiate chat session with past messages if needed
    chat_session = genai.GenerativeModel(
        model_name="gemini-1.5-pro-002",
        generation_config={
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain",
        },
    ).start_chat(history=history if history else [])

    # Send the question to the session and get the response
    response = chat_session.send_message(question)
    return response.text  # Return the generated answer


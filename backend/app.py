from flask import Flask, request, jsonify, session
import traceback
from dotenv import load_dotenv
from youtube_api import get_video_details
from gpt3_api import generate_response
from flask_cors import CORS
import openai
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/process_video', methods=['POST'])
def process_video():
    try:
        video_id = request.json.get('video_id')
        video_details = get_video_details(video_id)
        if video_details is None:
            return jsonify({"error": "Video not found"}), 404
        return jsonify(video_details)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "An error occurred processing the video", "details": str(e)}), 500

@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        data = request.json
        # user_message = data.get('message')
        # video_title = data.get('video_title', None)
        # video_description = data.get('video_description', None)

        user_message = data.get('message')
        video_title = data.get('video_title', None)
        video_description = data.get('video_description', None)

        # Debugging: Print received video details to console
        print(f"Received for chat: {user_message}")
        print(f"Video title: {video_title}")
        print(f"Video description: {video_description}")

        if not video_title or not video_description:
            print("Video details are missing in the request.")

        context = f"The following is a conversation about the video titled '{video_title}', which is described as: '{video_description}'."
        response = generate_response(user_message, context=context)
        
        return jsonify({"response": response})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Failed to generate response", "details": str(e)}), 500

def generate_response(prompt, context=""):
    openai.api_key = os.getenv('OPENAI_API_KEY')
    messages = [
        {"role": "system", "content": context},
        {"role": "user", "content": prompt}
    ]
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    
    return response['choices'][0]['message']['content']

if __name__ == '__main__':
    app.run(debug=True)

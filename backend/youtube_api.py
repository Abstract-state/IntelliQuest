from googleapiclient.discovery import build
import os

YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

def get_video_details(video_id):
    request = youtube.videos().list(
        part="snippet", 
        id=video_id
    )
    response = request.execute()
    
    if not response['items']:
        return None  # Video not found or access denied
    
    video_details = response['items'][0]['snippet']
    return {
        "title": video_details['title'],
        "description": video_details['description']
    }

# Add more functions as needed, such as fetching transcripts if implementing that feature.

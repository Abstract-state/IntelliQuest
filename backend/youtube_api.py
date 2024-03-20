# # from googleapiclient.discovery import build
# # from youtube_transcript_api import YouTubeTranscriptApi
# # from youtube_transcript_api._errors import TranscriptsDisabled
# # import os

# # YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
# # youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

# # def get_video_details(video_id):
# #     request = youtube.videos().list(
# #         part="snippet", 
# #         id=video_id
# #     )
# #     response = request.execute()
    
# #     if not response['items']:
# #         return None  # Video not found or access denied
    
# #     video_details = response['items'][0]['snippet']
# #     return {
# #         "title": video_details['title'],
# #         "description": video_details['description']
# #     }

# # # Add more functions as needed, such as fetching transcripts if implementing that feature.
# from googleapiclient.discovery import build
# from youtube_transcript_api import YouTubeTranscriptApi
# from youtube_transcript_api._errors import TranscriptsDisabled
# import os

# YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
# youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

# def get_video_details(video_id):
#     request = youtube.videos().list(
#         part="snippet", 
#         id=video_id
#     )
#     response = request.execute()
    
#     if not response['items']:
#         return None  # Video not found or access denied
    
#     video_details = response['items'][0]['snippet']
    
#     # Initialize the description with the snippet's description
#     description = video_details.get('description', '')
    
#     # If the description is empty, try to fetch the transcript
#     if not description:
#         try:
#             transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
#             transcript = transcript_list.find_generated_transcript(['en']).fetch()
#             description = " ".join([t['text'] for t in transcript])
#         except TranscriptsDisabled:
#             print("Transcripts are disabled for this video.")
#         except Exception as e:
#             print("Could not retrieve transcript:", e)

#     return {
#         "title": video_details['title'],
#         "description": description
#     }
from googleapiclient.discovery import build
from youtube_transcript_api import YouTubeTranscriptApi
import os

YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

def get_video_details(video_id):
    request = youtube.videos().list(part="snippet", id=video_id)
    response = request.execute()
    
    if not response['items']:
        return None  # Video not found or access denied
    
    video_details = response['items'][0]['snippet']
    transcript_text = ""
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        transcript_text = " ".join([t['text'] for t in transcript])
    except Exception:
        transcript_text = "No transcript available."
    
    return {
        "title": video_details['title'],
        "description": video_details.get('description', ''),
        "transcript": transcript_text
    }

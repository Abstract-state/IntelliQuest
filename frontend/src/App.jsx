import React, { useState } from 'react';
import VideoInputForm from './components/VideoInputForm';
import ChatBox from './components/ChatBox';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [videoDetails, setVideoDetails] = useState({ title: "", description: "" });

  const handleVideoSubmit = async (videoId) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/process_video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_id: videoId }),
      });
      const data = await response.json();
      if (data.title && data.description) {
        setVideoDetails({ title: data.title, description: data.description });
      } else {
        console.error("Video details not found.");
        // Optionally, reset videoDetails or handle this case as needed.
      }
    } catch (error) {
      console.error('Error processing video:', error);
    }
  };

  const handleSendMessage = async (userMessage) => {
    if (!videoDetails.title || !videoDetails.description) {
      console.error("Video details are missing. Cannot send message.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/send_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          video_title: videoDetails.title,
          video_description: videoDetails.description,
        }),
      });
      const data = await response.json();

      setChatMessages(prevMessages => [
        ...prevMessages,
        { message: userMessage, from: 'You' },
        { message: data.response, from: 'AI' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App container py-5">
      <VideoInputForm onSubmitVideo={handleVideoSubmit} />
      <ChatBox messages={chatMessages} onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;

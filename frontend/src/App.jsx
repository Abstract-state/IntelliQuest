// import React, { useState } from 'react';
// import VideoInputForm from './components/VideoInputForm';
// import ChatBox from './components/ChatBox';
// import { Navbar, Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const [chatMessages, setChatMessages] = useState([]);
//   const [videoDetails, setVideoDetails] = useState({ title: "", description: "" });

//   const handleVideoSubmit = async (videoId) => {
//     try {
//       const response = await fetch('http://127.0.0.1:5000/process_video', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ video_id: videoId }),
//       });
//       const data = await response.json();
//       if (data.title && data.description) {
//         setVideoDetails({ title: data.title, description: data.description });
//       } else {
//         console.error("Video details not found.");
//       }
//     } catch (error) {
//       console.error('Error processing video:', error);
//     }
//   };

//   const handleSendMessage = async (userMessage) => {
//     if (!videoDetails.title || !videoDetails.description) {
//       console.error("Video details are missing. Cannot send message.");
//       return;
//     }

//     try {
//       const response = await fetch('http://127.0.0.1:5000/send_message', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           message: userMessage,
//           video_title: videoDetails.title,
//           video_description: videoDetails.description,
//         }),
//       });
//       const data = await response.json();

//       setChatMessages(prevMessages => [
//         ...prevMessages,
//         { message: userMessage, from: 'You' },
//         { message: data.response, from: 'AI' },
//       ]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <div>
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand href="#">ChatApp</Navbar.Brand>
//         </Container>
//       </Navbar>
//       <Container className="py-5">
//         <VideoInputForm onSubmitVideo={handleVideoSubmit} />
//         <ChatBox messages={chatMessages} onSendMessage={handleSendMessage} />
//       </Container>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import VideoInputForm from './components/VideoInputForm';
import ChatBox from './components/ChatBox';
import { Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Make sure you have app.css in your src folder with the styles provided earlier

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
        { message: userMessage, from: '' },
        { message: data.response, from: '' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <Navbar bg="black" variant="dark" className="navbar">
        <Container>
          <Navbar.Brand href="#home">IntelliQuest</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="py-5">
        <div className="video-input-form">
          <VideoInputForm onSubmitVideo={handleVideoSubmit} />
        </div>
        <div className="chat-box">
          <ChatBox messages={chatMessages} onSendMessage={handleSendMessage} />
        </div>
      </Container>
    </div>
  );
}

export default App;

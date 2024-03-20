import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function VideoInputForm({ onSubmitVideo }) {
  const [videoLink, setVideoLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoId = videoLink.split('v=')[1]?.split('&')[0];
    if (videoId) {
      onSubmitVideo(videoId); // Ensure this is calling the prop function correctly
    } else {
      console.error("Invalid video link.");
      // Optionally, handle invalid link input as needed.
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>YouTube Video Link</Form.Label>
        <Form.Control
          type="text"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          placeholder="Enter YouTube video link"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Process Video
      </Button>
    </Form>
  );
}

export default VideoInputForm;

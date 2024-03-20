// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';

// function VideoInputForm({ onSubmitVideo }) {
//   const [videoLink, setVideoLink] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const videoId = videoLink.split('v=')[1]?.split('&')[0];
//     if (videoId) {
//       onSubmitVideo(videoId); // Ensure this is calling the prop function correctly
//     } else {
//       console.error("Invalid video link.");
//       // Optionally, handle invalid link input as needed.
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group className="mb-3">
//         <Form.Label>YouTube Video Link</Form.Label>
//         <Form.Control
//           type="text"
//           value={videoLink}
//           onChange={(e) => setVideoLink(e.target.value)}
//           placeholder="Enter YouTube video link"
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Process Video
//       </Button>
//     </Form>
//   );
// }

// export default VideoInputForm;

import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

function VideoInputForm({ onSubmitVideo }) {
  const [videoLink, setVideoLink] = useState('');
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true); // Start processing
    setErrorMessage(''); // Clear previous errors
    const videoId = videoLink.split('v=')[1]?.split('&')[0];
    if (videoId) {
      await onSubmitVideo(videoId);
    } else {
      setErrorMessage('Please enter a valid YouTube video link.');
    }
    setProcessing(false); // End processing
  };

  return (
    <>
      {processing && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Processing...</span>
          </Spinner>
        </div>
      )}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formVideoLink">
          <Form.Label>YouTube Video Link</Form.Label>
          <Form.Control
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="Enter YouTube video link"
            disabled={processing}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={processing}>
          {processing ? 'Processing...' : 'Process Video'}
        </Button>
      </Form>
    </>
  );
}

export default VideoInputForm;

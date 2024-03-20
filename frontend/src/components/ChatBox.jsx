// import React, { useState } from 'react';
// import { Form, Button, ListGroup } from 'react-bootstrap';

// function ChatBox({ messages, onSendMessage }) {
//   const [message, setMessage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSendMessage(message);
//     setMessage(''); // Clear input after sending
//   };

//   console.log("Rendering messages in ChatBox:", messages); // Debugging

//   return (
//     <div>
//       <ListGroup>
//         {messages.map((msg, index) => (
//           <ListGroup.Item key={index}>{`${msg.from}: ${msg.message}`}</ListGroup.Item>
//         ))}
//       </ListGroup>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Control
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message"
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Send
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default ChatBox;

import React, { useState } from 'react';
import { ListGroup, Form, InputGroup, Button, Card } from 'react-bootstrap';

function ChatBox({ messages, onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <Card className="card-bordered">
      <Card.Header>
        <h4 className="card-title">Chat</h4>
      </Card.Header>
      <ListGroup variant="flush" className="list-group-flush">
        {messages.map((msg, index) => (
          <ListGroup.Item key={index} className={`media-chat ${msg.from === 'AI' ? 'media-chat-reverse' : ''}`}>
            <div className="media-body">
              <p className="media-chat-message">{msg.message}</p>
              <p className="media-chat-time">{msg.from}</p>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={handleSubmit} className="publisher bt-1 border-light">
        <InputGroup>
          <Form.Control
            className="publisher-input"
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button variant="info" type="submit" className="publisher-btn">
            Send
          </Button>
        </InputGroup>
      </Form>
    </Card>
  );
}

export default ChatBox;

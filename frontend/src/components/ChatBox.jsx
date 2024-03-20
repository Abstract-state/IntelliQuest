import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

function ChatBox({ messages, onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage(''); // Clear input after sending
  };

  console.log("Rendering messages in ChatBox:", messages); // Debugging

  return (
    <div>
      <ListGroup>
        {messages.map((msg, index) => (
          <ListGroup.Item key={index}>{`${msg.from}: ${msg.message}`}</ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
}

export default ChatBox;

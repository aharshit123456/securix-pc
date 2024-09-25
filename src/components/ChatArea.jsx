import React from 'react';
import '../styles.css'; // Ensure your styles.css is imported

const ChatArea = ({ chat, onHeaderClick, onRemove }) => {
  const messages = [
    { from: 'them', content: 'Hello, how are you?' },
    { from: 'us', content: 'I am good, thanks!' },
    { from: 'them', content: 'Great to hear!' },
  ];

  return (
    <div className="chat-area">
      {/* Chat Header (fixed to top) */}
      <div className="chat-header">
        <div className="chat-header-name" onClick={onHeaderClick}>
          {chat.name}
        </div>
        <button className="remove-chat-button" onClick={onRemove}>
          Remove Chat
        </button>
      </div>

      {/* Chat Body (message area) */}
      <div className="chat-body">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.from === 'us' ? 'message-us' : 'message-them'
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      {/* Chat Input (fixed to bottom) */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          className="chat-input-field"
        />
        <button className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatArea;

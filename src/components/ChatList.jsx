import React, { useState } from 'react';
import { TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import Material-UI icon
import '../styles.css'; // Adjust the path if necessary

const ChatList = ({ onChatClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const chats = [
    { id: 1, name: 'Harshit', lastMessage: 'Hello' },
    { id: 2, name: 'Aman', lastMessage: 'How are you?' },
    // Add more chat data as needed
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-list-container">
      {/* Search Bar */}
      <TextField
        className='search-input'
        variant="outlined"
        placeholder="Search"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          style: {
            fontSize: '14px',
            borderRadius: '5px',
            backgroundColor: '#1e1e1e', // Dark background for input
            color: 'white',
          },
        }}
        InputLabelProps={{
          style: { color: 'white' },
        }}
      />

      {/* Chat List */}
      <div className="chat-list search-input">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className="chat-item"
            onClick={() => onChatClick(chat)}
          >
            {/* Profile Picture or Icon */}
            <div className="profile-picture">
              <AccountCircleIcon style={{ fontSize: 20, color: '#7d7d7d' }} /> {/* Placeholder Icon */}
            </div>
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-last-message">{chat.lastMessage}</div>
            </div>
            {/* Online Indicator */}
            <div className="online-indicator"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;

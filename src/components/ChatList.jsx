import React, { useState, useEffect } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { supabase } from './supabaseClient.jsx'; // Ensure this is your correct path
import '../styles.css';

const ChatList = ({ onChatClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState([]);
  const [newChatEmail, setNewChatEmail] = useState('');
  const [openNewChatDialog, setOpenNewChatDialog] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      const { data, error } = await supabase
        .from('chats')
        .select('id, name, lastMessage')
        .order('updated_at', { ascending: false });

      if (error) console.error('Error fetching chats:', error);
      else setChats(data);
    };

    fetchChats();
  }, []);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open the popup for new chat
  const handleOpenNewChat = () => {
    setOpenNewChatDialog(true);
  };

  // Close the popup
  const handleCloseNewChat = () => {
    setOpenNewChatDialog(false);
    setNewChatEmail('');
  };

  // Handle starting a new chat
  const handleSendHiMessage = async () => {
    // Check if the user with the entered email exists
    const { data: user, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', newChatEmail)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      alert('User not found');
      return;
    }

    const userId = supabase.auth.user().id;

    // Insert a new message saying "Hi"
    const { error: insertError } = await supabase.from('messages').insert([
      {
        sender_id: userId,
        receiver_id: user.id,
        message_text: 'Hi',
        timestamp: new Date(),
      },
    ]);

    if (insertError) {
      console.error('Error sending message:', insertError);
    } else {
      // Create a new chat entry in the `chats` table
      await supabase.from('chats').insert([
        { user1_id: userId, user2_id: user.id, lastMessage: 'Hi' },
      ]);
      alert('Hi message sent!');
    }

    handleCloseNewChat(); // Close the dialog after sending the message
  };

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

      {/* "New Chat" Button */}
      <Button
        onClick={handleOpenNewChat}
        variant="contained"
        style={{
          marginTop: '10px',
          backgroundColor: '#4caf50',
          color: 'white',
          fontSize: '14px',
        }}
      >
        New Chat
      </Button>

      {/* New Chat Dialog */}
      <Dialog open={openNewChatDialog} onClose={handleCloseNewChat}>
        <DialogTitle>Start New Chat</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter email to chat with"
            type="email"
            fullWidth
            variant="outlined"
            value={newChatEmail}
            onChange={(e) => setNewChatEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewChat} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendHiMessage} color="primary">
            Send Hi
          </Button>
        </DialogActions>
      </Dialog>

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

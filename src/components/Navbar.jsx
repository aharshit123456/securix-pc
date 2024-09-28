// components/Navbar.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  return (
    <div className="flex flex-col items-center h-screen" style={{
      width: '6vw',
      height: '95vh',
      backgroundColor: '#001F3F', // Navy dark blue
      color: 'white',
      borderRadius: '5px',
      padding: '20px 0', // Add padding
      margin: '0', // Reset margin
    }}>
      {/* Profile Button */}
      <IconButton style={{ color: 'white' }}>
        <AccountCircleIcon fontSize="large" />
      </IconButton>
      
      {/* Chat Button */}
      <IconButton style={{ color: 'white' }}>
        <ChatIcon fontSize="large" />
      </IconButton>
      
      {/* Spacer to distribute buttons evenly */}
      <div style={{ flexGrow: 1 }} />
      
      {/* Settings Button */}
      <IconButton style={{ color: 'white' }}>
        <SettingsIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default Navbar;

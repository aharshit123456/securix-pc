import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import Navbar from './components/Navbar.jsx';
import ChatList from './components/ChatList.jsx';
import ChatArea from './components/ChatArea.jsx';
import UserProfile from './components/UserProfile.jsx';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const App = () => {
  // Manage state for the current chat and visibility of the user profile
  const [currentChat, setCurrentChat] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleChatClick = (chat) => {
    setCurrentChat(chat);
    setShowUserProfile(false); // Hide user profile when switching chats
  };

  const handleHeaderClick = () => {
    setShowUserProfile(true); // Show the user profile when chat header is clicked
  };

  const handleRemoveChat = () => {
    setCurrentChat(null);
    setShowUserProfile(false); // Hide both chat and profile when chat is removed
  };

  const layout = [
    { i: 'navbar', x: 0, y: 0, w: 1, h: 2 }, // Navbar - 5% width
    { i: 'chatList', x: 1, y: 0, w: 2, h: 2 }, // Chat List - 15% width
    { i: 'chatArea', x: 3, y: 0, w: 6, h: 2 }, // Chat Area - 50% width
    { i: 'userProfile', x: 9, y: 0, w: 3, h: 2 }, // User Profile - 30% width
  ];

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      {/* App Header */}
      <div className="p-4 bg-gray-800 text-white text-center text-2xl font-bold">
        Securix Labs
      </div>

      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={window.innerWidth}
        isDraggable={false}
        isResizable={false}
      >
        {/* Navbar */}
        <div key="navbar" className="border-2 border-blue-500 bg-blue-200">
          <Navbar />
        </div>

        {/* Chat List */}
        <div key="chatList" className="border-2 border-green-500 bg-green-200">
          <ChatList onChatClick={handleChatClick} />
        </div>

        {/* Chat Area */}
        <div key="chatArea" className="border-2 border-yellow-500 bg-yellow-200">
          {currentChat ? (
            <ChatArea
              chat={currentChat}
              onHeaderClick={handleHeaderClick}
              onRemove={handleRemoveChat}
            />
          ) : (
            <div className="p-4">Select a chat to start messaging</div>
          )}
        </div>

        {/* User Profile */}
        <div key="userProfile" className="border-2 border-red-500 bg-red-200">
          {showUserProfile && (
            <UserProfile chat={currentChat} onRemove={() => setShowUserProfile(false)} />
          )}
        </div>
      </GridLayout>
    </div>
  );
};

export default App;

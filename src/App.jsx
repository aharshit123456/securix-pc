import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient.jsx';
import './index.css';
import GridLayout from 'react-grid-layout';
import Navbar from './components/Navbar.jsx';
import ChatList from './components/ChatList.jsx';
import ChatArea from './components/ChatArea.jsx';
import UserProfile from './components/UserProfile.jsx';
import Login from './components//Login.jsx'; // Import the Login component
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// const HEADER_TEXT = 'Securix Labs'; // Constant for header text

const App = () => {
  const [session, setSession] = useState(null); // To track session
  const [currentChat, setCurrentChat] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(false);

  useEffect(() => {
    // Fetch the current session using the updated method
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
  
    fetchSession();
  
    // Listen to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession?.session);
    });
  
    return () => {
      authListener?.unsubscribe();
    };
  }, []);
  
  

  const handleChatClick = (chat) => {
    setCurrentChat(chat);
    setShowUserProfile(false); 
  };

  const handleHeaderClick = () => {
    setShowUserProfile(true);
  };

  const handleRemoveChat = () => {
    setCurrentChat(null);
    setShowUserProfile(false);
  };

  const layout = [
    { i: 'navbar', x: 0, y: 0, w: 1, h: 2 },
    { i: 'chatList', x: 1, y: 0, w: 2, h: 2 },
    { i: 'chatArea', x: 3, y: 0, w: 6, h: 2 },
    { i: 'userProfile', x: 9, y: 0, w: 3, h: 2 },
  ];

  // If not authenticated, show login screen
  if (!session) {
    console.log("Rendering Login");
    return <Login onLogin={() => setSession(supabase.auth.session())} />;
  }
  

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      {/* <div className="p-4 bg-gray-800 text-white text-center text-2xl font-bold">
        {HEADER_TEXT}
      </div> */}

      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={window.innerWidth}
        isDraggable={false}
        isResizable={false}
        draggableHandle=".draggable-handle"
      >
        <div key="navbar">
          {console.log('Navbar rendered')}
          <Navbar />
        </div>

        <div key="chatList" className="draggable-handle">
          <ChatList onChatClick={handleChatClick} />
        </div>

        <div key="chatArea" className="draggable-handle">
          {currentChat ? (
            <ChatArea
              chat={currentChat}
              onHeaderClick={handleHeaderClick}
              onRemove={handleRemoveChat}
            />
          ) : (
            <div className="p-4 text-white">Select a chat to start messaging</div>
          )}
        </div>

        <div key="userProfile" className="draggable-handle">
          {showUserProfile && (
            <UserProfile chat={currentChat} onRemove={() => setShowUserProfile(false)} />
          )}
        </div>
      </GridLayout>
    </div>
  );
};

export default App;

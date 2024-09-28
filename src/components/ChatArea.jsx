import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient.jsx';  // Adjust the path if needed

const ChatArea = ({ chat, onHeaderClick, onRemove }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('id, message_text, sender_id')
        .eq('chat_id', chat.id)
        .order('timestamp', { ascending: true });

      if (error) console.error('Error fetching messages:', error);
      else setMessages(data);
    };

    fetchMessages();

    // Set up real-time subscription to listen for new messages
    const messageSubscription = supabase
      .from(`messages:chat_id=eq.${chat.id}`)
      .on('INSERT', (payload) => {
        setMessages((prevMessages) => [...prevMessages, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(messageSubscription);
    };
  }, [chat.id]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const { error } = await supabase.from('messages').insert([
      {
        chat_id: chat.id,
        sender_id: supabase.auth.user().id,
        message_text: newMessage,
        timestamp: new Date(),
      },
    ]);

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className="chat-area">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-header-name" onClick={onHeaderClick}>
          {chat.name}
        </div>
        <button className="remove-chat-button" onClick={onRemove}>
          Remove Chat
        </button>
      </div>

      {/* Chat Body */}
      <div className="chat-body">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender_id === supabase.auth.user().id ? 'message-us' : 'message-them'
            }`}
          >
            {message.message_text}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input-field"
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;

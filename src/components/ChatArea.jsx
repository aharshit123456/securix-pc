import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient.jsx';  // Ensure this path is correct
import { SignalProtocolAddress, SessionCipher } from '@signalapp/libsignal-client';

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
      else {
        const decryptedMessages = await Promise.all(data.map(async (message) => {
          const senderAddress = new SignalProtocolAddress(message.sender_id, 1);
          const sessionCipher = new SessionCipher(senderAddress);

          // Decrypt message
          const decryptedMessage = await sessionCipher.decryptPreKeyWhisperMessage(message.message_text, 'binary');
          return { ...message, message_text: new TextDecoder().decode(decryptedMessage) };
        }));
        setMessages(decryptedMessages);
      }
    };

    fetchMessages();

    // Real-time subscription to listen for new messages
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

    // Fetch recipient keys from database
    const { data: recipientKeys, error } = await supabase
      .from('user_keys')
      .select('identityKeyPair')
      .eq('user_id', chat.recipient_id)
      .single();

    if (error) {
      console.error('Error fetching recipient keys:', error);
      return;
    }

    // Create Signal Protocol address for recipient
    const recipientAddress = new SignalProtocolAddress(chat.recipient_id, 1);
    const sessionCipher = new SessionCipher(recipientAddress);

    // Encrypt message
    const encryptedMessage = await sessionCipher.encrypt(new TextEncoder().encode(newMessage));

    // Store encrypted message in database
    const { error: insertError } = await supabase.from('messages').insert([
      {
        chat_id: chat.id,
        sender_id: supabase.auth.user().id,
        message_text: encryptedMessage,
        timestamp: new Date(),
      },
    ]);

    if (insertError) {
      console.error('Error sending message:', insertError);
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

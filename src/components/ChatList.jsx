import React from 'react';

const ChatList = ({ onChatClick }) => {
  const chats = [
    { id: 1, name: 'Harshit', lastMessage: 'Hello' },
    { id: 2, name: 'Aman', lastMessage: 'How are you?' },
  ];

  return (
    <div>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="p-2 cursor-pointer hover:bg-gray-200"
          onClick={() => onChatClick(chat)}
        >
          <div>{chat.name}</div>
          <div className="text-sm text-gray-500">{chat.lastMessage}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;

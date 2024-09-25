import React from 'react';

const ChatArea = ({ chat, onHeaderClick, onRemove }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 bg-gray-300 flex justify-between items-center">
        <div className="cursor-pointer" onClick={onHeaderClick}>
          {chat.name}
        </div>
        <button
          onClick={onRemove}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Remove Chat
        </button>
      </div>

      {/* Chat Body */}
      <div className="p-4 flex-grow bg-white">
        <p>{chat.lastMessage}</p>
        <p>Chat content goes here...</p>
      </div>
    </div>
  );
};

export default ChatArea;

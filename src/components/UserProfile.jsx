import React from 'react';

const UserProfile = ({ chat, onRemove }) => {
  return (
    <div className="p-4">
      {chat ? (
        <div>
          <div className="text-xl font-bold">{chat.name}</div>
          <div className="text-gray-500">+91 1234567890</div>

          <button
            onClick={onRemove}
            className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Close Profile
          </button>
        </div>
      ) : (
        <div>No user selected</div>
      )}
    </div>
  );
};

export default UserProfile;

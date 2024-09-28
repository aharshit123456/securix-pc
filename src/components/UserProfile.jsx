import React from 'react';
import { Schedule } from '@mui/icons-material'; // Schedule icon from Material-UI
import '../styles.css'; // Ensure to import the new CSS file for styling

const UserProfile = ({ chat, onRemove }) => {
  return (
    <div className="p-4 user-profile-master">
      {chat ? (
        <div>
          {/* Profile Section */}
          <div className="flex items-center">
          <button className="remove-chat-button" onClick={onRemove}>
          Remove Profile
          </button>
             <div className="profile-container">
            {/* Circular Image View */}
            <div className="profile-image">
              <img
                src="../../assets/images/placeholder-profile.png" // Placeholder image URL
                alt={`${chat.name}'s profile`}
                className="rounded-full border border-gray-400"
              />
            </div>
            <div className="ml-4 details-section">
              <div className="text-xl font-bold">{chat.name}</div>
              <div className="text-gray-500">+91 1234567890</div>
              <div className="tag">Family</div>
            </div>
            </div>
            {/* Three Dots Setting Button */}
            <div className="settings-button">
              <button className="settings-btn">...</button>
            </div>
          </div>

          <button
            className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700 schedule-meet"
          >
            Schedule a Meet
          </button>

          <hr className="my-4" />

          {/* Schedule Section */}
          <div className="schedule-section">
            <div className="schedule-header">
              <Schedule className="schedule-icon" />
              <span className="schedule-title">{chat.name}'s Schedule</span>
            </div>

            {/* Placeholder for Schedule Cards */}
            <div className="schedule-cards">
              <div className="schedule-card">Task 1: Mock Appointment</div>
              <div className="schedule-card">Task 2: Meeting with Team</div>
              <div className="schedule-card">Task 3: Call with Client</div>
            </div>
          </div>
        </div>
      ) : (
        <div>No user selected</div>
      )}
    </div>
  );
};

export default UserProfile;

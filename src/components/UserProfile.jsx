import React, { useState } from 'react';
import { Schedule } from '@mui/icons-material'; // Schedule icon from Material-UI
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { supabase } from './supabaseClient'; // Ensure correct path to supabaseClient
import '../styles.css'; // Ensure to import the new CSS file for styling

const UserProfile = ({ chat, onRemove }) => {
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const user = supabase.auth.user(); // Get the logged-in user details

  // Open/Close dialog to add task/appointment
  const handleOpenTaskDialog = () => setOpenTaskDialog(true);
  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
    setTaskTitle('');
    setTaskDescription('');
    setTaskDate('');
  };

  // Add task/appointment to Supabase
  const handleAddTask = async () => {
    if (!taskTitle || !taskDate) {
      alert('Please fill out the title and date.');
      return;
    }

    const { error } = await supabase
      .from('tasks') // Make sure you have a 'tasks' table in your Supabase database
      .insert([
        {
          user_id: user.id, // Associate the task with the logged-in user
          title: taskTitle,
          description: taskDescription,
          date: taskDate,
        },
      ]);

    if (error) {
      console.error('Error adding task:', error);
    } else {
      alert('Task/Appointment added successfully!');
      handleCloseTaskDialog(); // Close the dialog after saving
    }
  };

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
            onClick={handleOpenTaskDialog}
          >
            Add Task/Appointment
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

          {/* Task Dialog */}
          <Dialog open={openTaskDialog} onClose={handleCloseTaskDialog}>
            <DialogTitle>Add Task/Appointment</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Task Title"
                fullWidth
                variant="outlined"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
                variant="outlined"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseTaskDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddTask} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div>No user selected</div>
      )}
    </div>
  );
};

export default UserProfile;

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.jsx';  // assuming you have the client set up

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await supabase
      .from('tasks')
      .select('*');
    setTasks(data);
  };

  const addTask = async () => {
    const { data } = await supabase
      .from('tasks')
      .insert([{ title: newTask }]);
    setTasks([...tasks, ...data]);
    setNewTask('');
  };

  return (
    <div>
      <h2>Tasks</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.jsx';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ title: '', date: '' });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const { data } = await supabase
      .from('appointments')
      .select('*');
    setAppointments(data);
  };

  const addAppointment = async () => {
    const { data } = await supabase
      .from('appointments')
      .insert([newAppointment]);
    setAppointments([...appointments, ...data]);
    setNewAppointment({ title: '', date: '' });
  };

  return (
    <div>
      <h2>Appointments</h2>
      <input
        type="text"
        value={newAppointment.title}
        onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
        placeholder="Appointment Title"
      />
      <input
        type="date"
        value={newAppointment.date}
        onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
      />
      <button onClick={addAppointment}>Add Appointment</button>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.title} - {new Date(appointment.appointment_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;

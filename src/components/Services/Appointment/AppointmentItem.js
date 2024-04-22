import React from 'react';

const AppointmentItem = ({ appointment }) => {
  return (
    <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>{appointment.doctor}</h2>
      <p>Patient Name: {appointment.patientName}</p>
      <p>Date: {appointment.appointmentDate}</p>
      <p>Time: {appointment.appointmentTime}</p>
      <p>Problem: {appointment.problem}</p>
    </div>
  );
};

export default AppointmentItem;

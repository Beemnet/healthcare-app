import React from 'react';

const AppointmentItem = ({ appointment }) => {
  return (
    <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>{appointment.Doctor}</h2>
      <p>Patient Name: {appointment.PatientName}</p>
      <p>Date: {appointment.AppointmentDate}</p>
      <p>Time: {appointment.AppointmentTime}</p>
      <p>Problem: {appointment.Problem}</p>
    </div>
  );
};

export default AppointmentItem;

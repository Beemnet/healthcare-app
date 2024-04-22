import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import useAuth from '../../../Hooks/useAuth'; // Import useAuth hook
import { AppointmentItem } from './AppointmentItem';

const ViewAppointments = () => {
  const { user } = useAuth(); // Get user information using useAuth
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://your-api-endpoint/appointments');
      if (response.ok) {
        const data = await response.json();
        const userAppointments = data.appointments.filter(appointment => appointment.patientEmail === user.email);
        setAppointments(userAppointments);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id='view-appointments'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <Container maxWidth="xl">
        <Typography variant='h6' sx={{ mt: 5, mb: 5 }}>Your Appointments</Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : appointments.length === 0 ? (
          <Typography>No appointments found for {user.displayName}.</Typography>
        ) : (
          appointments.map(appointment => (
            <AppointmentItem key={appointment.appointment_id} appointment={appointment} />
          ))
        )}
      </Container>
    </Box>
  );
};

export default ViewAppointments;

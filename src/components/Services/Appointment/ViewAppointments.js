import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import useAuth from '../../../Hooks/useAuth';
import AppointmentItem from './AppointmentItem';

const ViewAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {

      const url = `https://fnfgfbcxce.execute-api.eu-north-1.amazonaws.com/prod?patientEmail=${encodeURIComponent(user.email)}`;
      const response = await fetch(url);

      // Make the GET request to the API
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Handle the response data here
          console.log(data);
        })
        .catch(error => {
          // Handle any errors that occur during the fetch operation
          console.error('Error:', error);
        });
      
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id='view-appointments'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl">
        <Typography variant='h6' sx={{ mt: 5, mb: 5 }}>Your Appointments</Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : appointments.length === 0 ? (
          <Typography>No appointments found for {user.displayName}.</Typography>
        ) : (
          <>
            {Array.isArray(appointments) && (
              (() => {
                const appointmentItems = [];
                for (let i = 0; i < appointments.length; i++) {
                  appointmentItems.push(
                    <AppointmentItem key={appointments[i].appointment_id} appointment={appointments[i]} />
                  );
                }
                return appointmentItems;
              })()
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default ViewAppointments;

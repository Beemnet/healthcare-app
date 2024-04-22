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
      // const requestOptions = {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     requestContext: {
      //       authorizer: {
      //         claims: {
      //           'cognito:username': 'eyJraWQiOiJLTzRVMWZs' // Replace this with actual username if necessary
      //         }
      //       }
      //     },
      //     patientEmail: user.email // Using user's email from Firebase
      //   })
      // };

      // const response = await fetch('https://fnfgfbcxce.execute-api.eu-north-1.amazonaws.com/prod', requestOptions);
      
      // if (response.ok) {
      //   const data = await response.json();
      //   setAppointments(JSON.parse(data.body));

      const url = `https://fnfgfbcxce.execute-api.eu-north-1.amazonaws.com/prod?patientEmail=${encodeURIComponent(user.email)}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setAppointments(data); // Assuming the data is already in the correct format
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

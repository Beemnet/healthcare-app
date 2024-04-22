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

      const url = `https://am4mlhbef8.execute-api.eu-north-1.amazonaws.com/prod`;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email
        })
      };
  
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const data = await response.json();
        // Debugging log
        
        const appointmentsData = JSON.parse(data.body);
        const appointmentsArray = appointmentsData.appointments;
        console.log('Fetched appointments:', appointmentsArray); 
        setAppointments(appointmentsArray);

      } else {
        console.error('Failed to fetch appointments:', response.statusText);
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
            {appointments.map(appointment => (
              <AppointmentItem key={appointment.appointment_id} appointment={appointment} />
            ))}
          </>
        )}
      </Container>
    </Box>
  );
};

export default ViewAppointments;

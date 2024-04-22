import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import useAuth from '../../../Hooks/useAuth'; // Custom hook to get user information
import PrescriptionItem from './PrescriptionItem'; // Component to display individual prescription details

const ViewPrescriptions = () => {
  const { user } = useAuth(); // Get user information from useAuth
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchPrescriptions();
  }, []); // Fetch data once on component mount


  const fetchPrescriptions = async () => {
    try {
      const userEmail = user.email;
      const requestBody = JSON.stringify({ email: userEmail });
  
      const response = await fetch(`https://a6bomqol5e.execute-api.eu-west-3.amazonaws.com/dev`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
  
      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`Failed to fetch prescriptions. Response: ${responseText}`);
      }
  
      const data = await response.json();
      console.log('Received prescriptions:', data); // Log the data to inspect the content
  
      const userPrescriptions = data.prescriptions || [];
      setPrescriptions(userPrescriptions);
      setError(null);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      setError(error.message);
    }
  };
  

  return (
    <Box
      id="view-prescriptions"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h6" sx={{ mt: 5, mb: 5 }}>
          Your Prescriptions
        </Typography>

        {error ? (
          <Typography color="error">Error: {error}</Typography> // Display error message in case of an error
        ) : prescriptions.length === 0 ? (
          <Typography>No prescriptions found.</Typography>
        ) : (
          <List>
            {prescriptions.map((prescription) => (
              <ListItem key={prescription.prescription_id}>
                <PrescriptionItem prescription={prescription} />
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </Box>
  );  
};



export default ViewPrescriptions;

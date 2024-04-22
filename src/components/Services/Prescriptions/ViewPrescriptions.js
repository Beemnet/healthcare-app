import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import useAuth from '../../../Hooks/useAuth'; // Custom hook to get user information
import PrescriptionItem from './PrescriptionItem'; // Component to display individual prescription details

const ViewPrescriptions = () => {
  const { user } = useAuth(); // Get user information from useAuth
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []); // Fetch data once on component mount


  const fetchPrescriptions = async () => {
    try {
      const userEmail = user.email; // Logged-in user's email
      const response = await fetch(`https://a6bomqol5e.execute-api.eu-west-3.amazonaws.com/dev`, {
        method: 'POST', // Using POST to send data to the server
        headers: {
          'Content-Type': 'application/json', // Ensure the right content type
        },
        body: JSON.stringify({ email: userEmail }), // Send email in the request body
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch prescriptions. Status code: ${response.status}`);
      }

      const data = await response.json(); // Parse the JSON response
      const userPrescriptions = data.prescriptions || []; // Default to an empty array
      setPrescriptions(userPrescriptions); // Update the state with fetched prescriptions
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      setError(error.message); // Set the error message in state
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
  
        {prescriptions.length === 0 ? (
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

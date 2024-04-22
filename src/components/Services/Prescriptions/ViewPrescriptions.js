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
      const userEmail = user.email; // Get user's email
      const requestBody = JSON.stringify({ email: userEmail }); // Prepare JSON body
  
      const response = await fetch(`https://a6bomqol5e.execute-api.eu-west-3.amazonaws.com/dev`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: requestBody }), // Ensure correct structure
      });
  
      if (!response.ok) {
        const responseText = await response.text(); // Check error details
        throw new Error(`Failed to fetch prescriptions. Response: ${responseText}`);
      }
  
      const data = await response.json(); // Parse response
      const userPrescriptions = data.prescriptions || []; // Fallback to empty array
      setPrescriptions(userPrescriptions); // Update state
      setError(null); // Clear errors if successful
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      setError(error.message); // Set error in case of failure
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

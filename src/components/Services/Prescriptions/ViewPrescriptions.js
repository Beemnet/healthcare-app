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
      const response = await fetch('https://your-api-endpoint/prescriptions'); // Replace with your endpoint
      if (response.ok) {
        const data = await response.json();
        // Filter prescriptions by the logged-in user's email
        const userPrescriptions = data.prescriptions.filter(
          (prescription) => prescription.email === user.email
        );
        setPrescriptions(userPrescriptions); // Set state with filtered prescriptions
      } else {
        console.error('Failed to fetch prescriptions');
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
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

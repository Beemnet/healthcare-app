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

  // const fetchPrescriptions = async () => {
  //   try {
  //     const response = await fetch('https://your-api-endpoint/prescriptions'); // Replace with your endpoint
  //     if (response.ok) {
  //       const data = await response.json();
  //       // Filter prescriptions by the logged-in user's email
  //       const userPrescriptions = data.prescriptions.filter(
  //         (prescription) => prescription.email === user.email
  //       );
  //       setPrescriptions(userPrescriptions); // Set state with filtered prescriptions
  //     } else {
  //       console.error('Failed to fetch prescriptions');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching prescriptions:', error);
  //   }
  // };

  const fetchPrescriptions = async () => {
    try {
      const userEmail = user.email; // Logged-in user's email
      const userName = user.displayName; // Logged-in user's name (or other identifier)
      const response = await fetch(`https://a6bomqol5e.execute-api.eu-west-3.amazonaws.com/dev`, {
        method: 'POST', // Using POST to send data to the server
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }), // Send user data
      });
  
      if (response.ok) {
        const data = await response.json();
        const userPrescriptions = data.prescriptions || []; // Default to an empty array
        setPrescriptions(userPrescriptions); // Set the retrieved prescriptions in state
      } else {
        console.error('Failed to fetch prescriptions');
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  // return (
  //   <Box
  //     id="view-prescriptions"
  //     sx={{
  //       display: 'flex',
  //       flexDirection: 'column',
  //       minHeight: '100vh',
  //     }}
  //   >
  //     <Container maxWidth="xl">
  //       <Typography variant="h6" sx={{ mt: 5, mb: 5 }}>
  //         Your Prescriptions
  //       </Typography>

  //       {prescriptions.length === 0 ? (
  //         <Typography>No prescriptions found.</Typography>
  //       ) : (
  //         <List>
  //           {prescriptions.map((prescription) => (
  //             <ListItem key={prescription.prescription_id}>
  //               <PrescriptionItem prescription={prescription} />
  //             </ListItem>
  //           ))}
  //         </List>
  //       )}
  //     </Container>
  //   </Box>
  // );
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

import React from 'react';
import { Typography, Box } from '@mui/material';

const PrescriptionItem = ({ prescription }) => {
  const { doctor, prescription: prescriptionText, date } = prescription; // Adjusted field names

  return (
    <Box
      sx={{
        padding: '16px',
        borderBottom: '1px solid #ddd', // Add a border for separation
      }}
    >
      <Typography variant="subtitle1">Doctor: {doctor}</Typography>
      <Typography variant="body2">Prescription: {prescriptionText}</Typography> {/* Corrected field */}
      <Typography variant="body2">Date: {new Date(date).toLocaleDateString()}</Typography> {/* Formatted date */}
    </Box>
  );
};

export default PrescriptionItem;

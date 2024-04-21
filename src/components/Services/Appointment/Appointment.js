import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import swal from 'sweetalert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useAuth from '../../../Hooks/useAuth';
import { SHA256 } from 'crypto-js';

const Appointment = () => {
  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('12:00'); // Default time value
  const [docName, setDocName] = useState('');
  const [problem, setProblem] = useState('');


  const handleChange = (event) => {
    setDocName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
        const appointmentData = {
            appointment_id: SHA256(JSON.stringify({
              doctor: docName,
              patientName: user.displayName,
              patientEmail: user.email,
              problem: problem,
              appointmentDate: selectedDate.toISOString().substring(0, 10),
              appointmentTime: selectedTime,
            })).toString(),
            
            doctor: docName,
            patientName: user.displayName,
            patientEmail: user.email,
            problem: problem,
            appointmentDate: selectedDate.toISOString().substring(0, 10),
            appointmentTime: selectedTime,
        };

      const request = {
        path: "/appointment",
        httpMethod: "POST",
        headers: {
          Accept: "*/*",
          Authorization: "eyJraWQiOiJLTzRVMWZs",
          "content-type": "application/json; charset=UTF-8"
        },
        queryStringParameters: null,
        pathParameters: null,
        requestContext: {
          authorizer: {
            claims: {
              "cognito:username": user.email
            }
          }
        },
        body: JSON.stringify(appointmentData),
      };
  
      const response = await fetch('https://fnfgfbcxce.execute-api.eu-north-1.amazonaws.com/prod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
  
      if (response.ok) {
        // Handle success response
        swal("Your Appointment is Done.", {
          button: false,
          icon: "success"
        });
      } else {
        // Handle error response
        console.error('Failed to create appointment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box id='appointment'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <Container maxWidth="xl">
        <Typography variant='h6' sx={{
          mt: 5, mb: 5
        }}>Select your time and data for Appointment</Typography>

        <FormControl sx={{ mb: 5, minWidth: '50%' }}>
          <InputLabel id="demo-simple-select-autowidth-label">Select Doctor Name</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={docName}
            onChange={handleChange}
            autoWidth
            label="Select Doctor Name"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Lee S. Williamson">Lee S. Williamson</MenuItem>
            <MenuItem value="Greg S. Grinstead">Greg S. Grinstead</MenuItem>
            <MenuItem value="Roger K. Jackson">Roger K. Jackson</MenuItem>
            <MenuItem value="Frank T. Grimsley">Frank T. Grimsley</MenuItem>
            <MenuItem value="Rudolph V. Spitler">Rudolph V. Spitler</MenuItem>
            <MenuItem value="Erik R. Faulkner">Erik R. Faulkner</MenuItem>
            <MenuItem value="Phillip L. Williams">Phillip L. Williams</MenuItem>
            <MenuItem value="Johnny R. Atterberry">Johnny R. Atterberry</MenuItem>
            <MenuItem value="Michael I. Johnson">Michael I. Johnson</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ mb: 2 }}
          fullWidth
          label="Your Name"
          id="fullWidth"
          value={user.displayName}
          disabled
        />

        <TextField
          sx={{ mb: 2 }}
          fullWidth
          label="Your Mail"
          id="fullWidth"
          value={user.email}
          disabled
        />

        <form onSubmit={handleSubmit}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Select a date"
          />

          <TimePicker
            value={selectedTime}
            onChange={(time) => setSelectedTime(time)}
          />          
        </form>

        <TextField
          sx={{ mt: 2, mb: 2 }}
          fullWidth
          label="Problem type"
          id="fullWidth"
          value={problem}
          onChange={(onChange) => setProblem(onChange.target.value)}
        />

        <Button
          sx={{ p: 1, mt: 2, mb: 5 }}
          onClick={handleSubmit}
          fullWidth
          variant="contained"
        >
          <AddCircleIcon /> Confirm
        </Button>
      </Container>
    </Box>
  );
};

export default Appointment;


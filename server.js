const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors()); 
app.use(express.json());

// A simple in-memory store to simulate an OTP
const otpStore = {};

// API Endpoint 1: Aadhaar Validation & OTP Generation
// This endpoint now performs a simplified check to match the frontend
app.post('/api/aadhaar-validate', (req, res) => {
  const { aadhaarNumber, entrepreneurName } = req.body;
  if (aadhaarNumber && entrepreneurName && /^\d{12}$/.test(aadhaarNumber)) {
    const mockOtp = '123456';
    otpStore[aadhaarNumber] = mockOtp;
    console.log(`Simulated OTP for ${aadhaarNumber}: ${mockOtp}`);
    res.json({ success: true, message: 'OTP sent successfully!' });
  } else {
    res.status(400).json({ success: false, message: 'Aadhaar number and name are required, and Aadhaar must be 12 digits.' });
  }
});

// API Endpoint 2: OTP Validation
app.post('/api/otp-validate', (req, res) => {
  const { aadhaarNumber, otp } = req.body;
  if (otpStore[aadhaarNumber] === otp) {
    res.json({ success: true, message: 'OTP validated successfully!' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP.' });
  }
});

// API Endpoint 3: PAN Validation
app.post('/api/pan-validate', (req, res) => {
  const { panNumber } = req.body;
  const panRegex = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
  if (panRegex.test(panNumber)) {
    res.json({ success: true, message: 'PAN is valid.' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid PAN format.' });
  }
});

// New API Endpoint for final form submission
app.post('/api/submit-registration', async (req, res) => {
  const registrationData = req.body;
  console.log('Final registration data received:', registrationData);
  try {
    // This is a placeholder. You would need to set up a PostgreSQL DB and run 'npx prisma migrate dev'
    // const newRegistration = await prisma.registration.create({ data: registrationData });
    res.json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit form.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});

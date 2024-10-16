const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingRoutes = require('./api/bookings');
const scheduleRoutes = require('./api/schedule');
const centreRoutes = require('./api/centre');

require('dotenv').config(); // For environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
  

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Declare API Routes
app.use('/api/bookings', bookingRoutes); // Use bookings routes with base path `/api/bookings`
app.use('/api/schedule', scheduleRoutes); // Use bookings routes with base path `/api/schedule`
app.use('/api/centre', centreRoutes); // Use bookings routes with base path `/api/centre`

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

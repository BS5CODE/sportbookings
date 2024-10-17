const express = require('express');
const router = express.Router();
const Centre = require('../models/Centre');
const Schedule = require('../models/Schedule');
const axios = require('axios');
const Booking = require('../models/Booking');
require('dotenv').config();

// View Bookings for a specific centre, sport, and date
router.post('/view', async (req, res) => {
    const { centreId, sport, date } = req.body;
  
    try {
      if (!centreId || !sport || !date) {
        return res.status(400).json({ message: 'centreId, sport, and date are required.' });
      }

      // Find the centre and populate sports and courts
      const centre = await Centre.findById(centreId).populate({
          path: 'sports.courts.schedule'
        });
        
        if (!centre) {
            return res.status(404).json({ message: 'Centre not found.' });
        }
  
      // Find the specific sport in the centre
      const sportData = centre.sports.find(s => s.name.toLowerCase() === sport.toLowerCase());
      if (!sportData) {
        return res.status(404).json({ message: 'Sport not found in the selected centre.' });
      }
  
      const bookings = [];
  
      // Loop through each court in the sport
      for (const court of sportData.courts) {
        if (court.schedule) {
          // Call the schedule/check API for each court and date
          const scheduleResponse = await axios.post(`${process.env.BASE_URL}/api/schedule/getslots`, {
            scheduleId: court.schedule, // Pass the scheduleId
            date: date // Pass the date
          });
  
          const { slots } = scheduleResponse.data;
  
          // If slots for the specified date are found, add the booking details
          if (slots) {
            bookings.push({
              courtNumber: court.courtNumber,
              date: date,
              slots: slots
            });
          }
        }
      }
  
      return res.status(200).json({ centreId, sport, date, bookings });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  });
  
// Create a Booking
router.post('/create', async (req, res) => {
    const { centreId, courtId, sport, scheduleId, date, time, customerName, contactInfo, amountPaid } = req.body;
  
    try {
      // Validate input
      if (!centreId || !courtId || !sport || !scheduleId || !date || !time || !customerName || !contactInfo || !amountPaid) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      // Fetch the schedule by scheduleId
      const schedule = await Schedule.findById(scheduleId);
  
      if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found.' });
      }
  
      // Find the specific date in the schedule
      var selectedDate = schedule.dates.find(d => d.date.toISOString() === new Date(date).toISOString());
      
      var dateNotExist = false;
      if (!selectedDate) {
        selectedDate = {
            date: new Date(date),
            slots: [] // Initialize with an empty slots array
        };
        dateNotExist = true;
      }
      
      // Find if the time slot already exists and check for availability
      var selectedSlot = selectedDate.slots.find(s => s.start_time === time);
  
      // If the start_time is found in the slots array, return an error for double booking
      if (selectedSlot && selectedSlot.booking) {
        return res.status(409).json({ message: 'The selected slot is already booked.' });
      }
  
      // Create a new booking transaction
      const newBooking = new Booking({
        customerName,
        contactInfo,
        amountPaid,
        courtId,
        centreId,
        sport,
        bookingDate: new Date()
      });
  
      const savedBooking = await newBooking.save();
  
      selectedSlot = {
        start_time: time,
        booking: savedBooking._id,
        customer_name: customerName // Make sure customerName is correctly assigned here
      };
      selectedDate.slots.push(selectedSlot); // Add the new slot to the selected date
       // If slot already exists, update it, otherwise, push a new slot

      if (dateNotExist) {
        schedule.dates.push(selectedDate);
      }
      // Save the updated schedule
      await schedule.save();
  
      return res.status(201).json({ message: 'Booking created successfully!', booking: savedBooking });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  });

  
module.exports = router;

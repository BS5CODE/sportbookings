const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// get booked slots
router.post('/getslots', async (req, res) => {
    const { scheduleId, date } = req.body;
  
    try {
      // Find the schedule by its ID
      const schedule = await Schedule.findById(scheduleId);
  
      if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found.' });
      }
  
      // Find the date in the schedule
        const selectedDate = schedule.dates.find(d => {
            const scheduleDate = new Date(d.date); // Convert the schedule date to Date object
            const inputDate = new Date(date); // Convert the input date to Date object
            
            return (
                scheduleDate.getFullYear() === inputDate.getFullYear() &&
                scheduleDate.getMonth() === inputDate.getMonth() &&
                scheduleDate.getDate() === inputDate.getDate()
            );
        });

      if (!selectedDate) {
        return res.status(200).json({ slots: [] });
      }
  
      // Return the slots for that specific date
      return res.status(200).json({ slots: selectedDate.slots });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  });

module.exports = router;

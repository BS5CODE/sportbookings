const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    dates: [{
        date: { type: Date, required: true }, // Individual date for scheduling
        slots: [{
          booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
          start_time: { type: Number, required: true }, // 24 hr format
          customer_name: { type: String } // Name of the customer
        }]
      }]
  });
  
  const Schedule = mongoose.model('Schedule', scheduleSchema);
  
  module.exports = Schedule;
  
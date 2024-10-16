const mongoose = require('mongoose');

// Booking Schema
const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },  // Name of the customer
  contactInfo: { type: String, required: true },   // Contact information
  amountPaid: { type: Number, required: true },    // Payment amount
  bookingDate: { type: Date, default: Date.now },  // Date of the booking transaction
  courtId: { type: mongoose.Schema.Types.ObjectId, ref: 'Court', required: true }, // Reference to the court being booked
  centreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true }, // Reference to the centre
  sport: { type: String, required: true } // The sport
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

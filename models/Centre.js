const mongoose = require('mongoose');

// Court Schema
const courtSchema = new mongoose.Schema({
  courtNumber: { type: Number, required: true }, // Court number
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' } // Reference to Schedule model
});

// Sport Schema
const sportSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Sport name
  courts: [courtSchema] // List of courts for the sport
});

// Centre Schema
const centreSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Centre name
  sports: [sportSchema] // List of sports in the centre
});

const Centre = mongoose.model('Centre', centreSchema);

module.exports = Centre;

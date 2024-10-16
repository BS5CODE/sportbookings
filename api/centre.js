const express = require('express');
const router = express.Router();
const Centre = require('../models/Centre');
const Schedule = require('../models/Schedule');

router.post('/new', async (req, res) => {
    const { name } = req.body;

    try {
      // Validate input
      if (!name) {
        return res.status(400).json({ message: 'Centre name is required.' });
      }
  
      // Create a new empty Centre document
      const newCentre = new Centre({
        name,
        sports: [] // No sports or courts initially
      });
  
      // Save the centre to the database
      const savedCentre = await newCentre.save();
  
      return res.status(201).json({ message: 'Empty centre created successfully!', centre: savedCentre });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  });

// Create a new sport and add it to a centre
router.post('/:centreId/addsport', async (req, res) => {
    const { centreId } = req.params;
    const { name } = req.body;

    try {
        // Validate input
        if (!name) {
            return res.status(400).json({ message: 'Sport name is required.' });
        }

        // Find the centre by ID
        const centre = await Centre.findById(centreId);
        if (!centre) {
            return res.status(404).json({ message: 'Centre not found.' });
        }

        // Find existing sport to count its courts
        const existingSport = centre.sports.find(sport => sport.name.toLowerCase() === name.toLowerCase());
        const courtsToAdd = [];

        if (existingSport) {
            // If the sport already exists, create a new schedule and add a new court
            const newSchedule = new Schedule({ dates: [] });
            await newSchedule.save(); // Save the new schedule

            const newCourt = {
                courtNumber: existingSport.courts.length + 1, // Increment court number
                schedule: newSchedule._id // Reference to the new schedule
            };

            // Add the new court to the existing sport's courts array
            existingSport.courts.push(newCourt);

            // Save the updated centre
            await centre.save();

            return res.status(200).json({ message: 'New court added successfully to the existing sport!', sport: existingSport });
        } else {
            // If the sport does not exist, create a new schedule and add one court
            const newSchedule = new Schedule({ dates: [] });
            await newSchedule.save(); // Save the new schedule

            courtsToAdd.push({
                courtNumber: 1,
                schedule: newSchedule._id // Reference to the new schedule
            });
        }

        // Create the new sport object
        const newSport = {
            name,
            courts: courtsToAdd
        };

        // Add the new sport to the centre's sports array
        centre.sports.push(newSport);
        
        // Save the updated centre
        await centre.save();

        return res.status(201).json({ message: 'Sport added successfully!', sport: newSport });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

module.exports = router;

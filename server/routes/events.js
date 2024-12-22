const express = require('express');
const router = express.Router();
const { requireUser } = require('./middleware/auth');
const eventService = require('../services/event');
const logger = require('../utils/log')('eventRoutes');

// Create a new event
router.post('/', requireUser, async (req, res) => {
  console.log('Received event creation request with body:', req.body);
  console.log('User making request:', req.user);
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user.id
    };

    const event = await eventService.createEvent(eventData);

    logger.info(`Event created with id: ${event._id}`);
    res.status(201).json(event);
  } catch (error) {
    console.error('Detailed error in create event route:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get all events
router.get('/', requireUser, async (req, res) => {
  try {
    const events = await eventService.listEvents();
    res.status(200).json(events);
  } catch (error) {
    logger.error('Error fetching events:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
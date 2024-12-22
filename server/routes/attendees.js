const express = require('express');
const router = express.Router();
const { requireUser } = require('./middleware/auth');
const eventService = require('../services/event');
const logger = require('../utils/log')('attendeeRoutes');

// Add attendee to event
router.post('/:eventId', requireUser, async (req, res) => {
  try {
    const { eventId } = req.params;
    const { name, email } = req.body;

    const event = await eventService.addAttendeeToEvent(eventId, { name, email });

    logger.info(`Added attendee to event ${eventId}`);
    res.status(200).json(event);
  } catch (error) {
    logger.error('Error adding attendee:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
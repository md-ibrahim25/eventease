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

// Get event by ID
router.get('/:id', requireUser, async (req, res) => {
  try {
    const event = await eventService.getEvent(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    logger.error('Error fetching event:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update event by ID
router.put('/:id', requireUser, async (req, res) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body);
    res.status(200).json(event);
  } catch (error) {
    logger.error('Error updating event:', error);
    res.status(400).json({ error: error.message });
  }
});

// Delete event by ID
router.delete('/:id', requireUser, async (req, res) => {
  try {
    const result = await eventService.deleteEvent(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error deleting event:', error);
    res.status(400).json({ error: error.message });
  }
});

// Add attendee to event
router.post('/:eventId/attendees', requireUser, async (req, res) => {
  const { eventId } = req.params;
  const { name, email } = req.body;

  try {
    const updatedEvent = await eventService.addAttendeeToEvent(eventId, { name, email });
    res.status(201).json(updatedEvent);
  } catch (error) {
    console.error('Error adding attendee:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { requireUser } = require('./middleware/auth');
const eventService = require('../services/event');
const logger = require('../utils/log')('attendeeRoutes');
const Event = require('../models/Event');

// Get all attendees
router.get('/', requireUser, async (req, res) => {
  console.log('GET /api/attendees route hit');
  try {
    const event = await Event.find().populate('attendees');
    const attendees = event.reduce((acc, curr) => {
      curr.attendees.forEach(attendee => {
        if (!acc.some(a => a.email === attendee.email)) {
          acc.push({
            id: attendee._id,
            name: attendee.name,
            email: attendee.email
          });
        }
      });
      return acc;
    }, []);
    logger.info('Retrieved all attendees');
    res.json({ attendees });
  } catch (error) {
    logger.error('Error retrieving attendees:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get attendees for an event
router.get('/:eventId/attendees', requireUser, async (req, res) => {
  try {
    const { eventId } = req.params;
    logger.debug(`Fetching attendees for event ${eventId}`);

    const event = await eventService.getEvent(eventId);
    if (!event) {
      logger.warn(`Event not found with id: ${eventId}`);
      throw new Error('Event not found');
    }

    logger.info(`Retrieved attendees for event ${eventId}`);
    res.json({ attendees: event.attendees });
  } catch (error) {
    logger.error('Error retrieving event attendees:', error);
    res.status(400).json({ error: error.message });
  }
});

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

// Delete attendee from event
router.delete('/:eventId/:attendeeId', requireUser, async (req, res) => {
  try {
    const { eventId, attendeeId } = req.params;

    const event = await eventService.removeAttendeeFromEvent(eventId, attendeeId);

    logger.info(`Removed attendee ${attendeeId} from event ${eventId}`);
    res.status(200).json(event);
  } catch (error) {
    logger.error('Error removing attendee:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
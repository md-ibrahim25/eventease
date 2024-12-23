const express = require('express');
const router = express.Router();
const { requireUser } = require('./middleware/auth');
const eventService = require('../services/event');
const logger = require('../utils/log')('taskRoutes');

// Create a new task for an event
router.post('/:eventId/tasks', requireUser, async (req, res) => {
  console.log('POST /api/events/:eventId/tasks route hit');
  console.log('Request body:', req.body);
  try {
    const { eventId } = req.params;
    const taskData = req.body;

    logger.debug(`Creating task for event ${eventId}:`, taskData);
    const event = await eventService.addTaskToEvent(eventId, taskData);

    // Find the newly created task
    const newTask = event.tasks[event.tasks.length - 1];

    logger.info(`Task created for event ${eventId}`);
    res.status(201).json(newTask);
  } catch (error) {
    logger.error('Error creating task:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get tasks for an event
router.get('/:eventId/tasks', requireUser, async (req, res) => {
  console.log('GET /api/events/:eventId/tasks route hit');
  console.log('Request params:', req.params);
  try {
    const { eventId } = req.params;

    logger.debug(`Fetching tasks for event ${eventId}`);
    const event = await eventService.getEvent(eventId);

    if (!event) {
      throw new Error('Event not found');
    }

    logger.info(`Retrieved tasks for event ${eventId}`);
    res.json({ tasks: event.tasks });
  } catch (error) {
    logger.error('Error fetching tasks:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
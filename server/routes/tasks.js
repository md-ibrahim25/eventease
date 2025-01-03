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

// Update a task in an event
router.put('/:eventId/tasks/:taskId', requireUser, async (req, res) => {
  console.log('PUT /api/events/:eventId/tasks/:taskId route hit');
  console.log('Request params:', req.params);
  console.log('Request body:', req.body);

  try {
    const { eventId, taskId } = req.params;
    const taskData = req.body;

    logger.debug(`Updating task ${taskId} in event ${eventId}:`, taskData);
    const updatedTask = await eventService.updateTaskInEvent(eventId, taskId, taskData);

    logger.info(`Task ${taskId} updated in event ${eventId}`);
    res.json(updatedTask);
  } catch (error) {
    logger.error('Error updating task:', error);
    res.status(400).json({ error: error.message });
  }
});

// Delete a task from an event
router.delete('/:eventId/tasks/:taskId', requireUser, async (req, res) => {
  console.log('DELETE /api/events/:eventId/tasks/:taskId route hit');
  console.log('Request params:', req.params);

  try {
    const { eventId, taskId } = req.params;

    logger.debug(`Deleting task ${taskId} from event ${eventId}`);
    const result = await eventService.deleteTaskFromEvent(eventId, taskId);

    logger.info(`Task ${taskId} deleted from event ${eventId}`);
    res.json({ success: true });
  } catch (error) {
    logger.error('Error deleting task:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
const Event = require('../models/Event');
const logger = require('../utils/log')('eventService');

const createEvent = async (eventData) => {
  try {
    logger.debug('Creating new event with data:', eventData);
    const event = new Event(eventData);
    await event.save();
    logger.info(`Created new event with id: ${event._id}`);
    return event;
  } catch (error) {
    logger.error('Error creating event:', { error: error.stack });
    throw error;
  }
};

const getEvent = async (id) => {
  try {
    logger.debug(`Getting event with id: ${id}`);
    const event = await Event.findById(id)
      .populate('attendees', 'name email')
      .populate('tasks.assignedTo', 'name email');

    if (!event) {
      logger.warn(`Event not found with id: ${id}`);
      throw new Error('Event not found');
    }

    logger.info(`Retrieved event with id: ${id}`);
    return event;
  } catch (error) {
    logger.error('Error getting event:', { error: error.stack });
    throw error;
  }
};

const listEvents = async () => {
  try {
    logger.debug('Listing all events');
    const events = await Event.find()
      .populate('attendees', 'name email')
      .populate('tasks.assignedTo', 'name email');

    logger.info(`Retrieved ${events.length} events`);
    return events;
  } catch (error) {
    logger.error('Error listing events:', { error: error.stack });
    throw error;
  }
};

const updateEvent = async (id, updateData) => {
  try {
    logger.debug(`Updating event ${id} with data:`, updateData);
    const event = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
    .populate('attendees', 'name email')
    .populate('tasks.assignedTo', 'name email');

    if (!event) {
      logger.warn(`Event not found with id: ${id}`);
      throw new Error('Event not found');
    }

    logger.info(`Updated event with id: ${id}`);
    return event;
  } catch (error) {
    logger.error('Error updating event:', { error: error.stack });
    throw error;
  }
};

const deleteEvent = async (id) => {
  try {
    logger.debug(`Deleting event with id: ${id}`);
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      logger.warn(`Event not found with id: ${id}`);
      throw new Error('Event not found');
    }

    logger.info(`Deleted event with id: ${id}`);
    return { success: true };
  } catch (error) {
    logger.error('Error deleting event:', { error: error.stack });
    throw error;
  }
};

const addAttendeeToEvent = async (eventId, attendeeData) => {
  try {
    logger.debug(`Adding attendee to event ${eventId}:`, attendeeData);

    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    // Add attendee to the event
    event.attendees.push(attendeeData);
    await event.save();

    // Return populated event
    const updatedEvent = await Event.findById(eventId)
      .populate('attendees', 'name email')
      .populate('tasks.assignedTo', 'name email');

    logger.info(`Added attendee to event ${eventId}`);
    return updatedEvent;
  } catch (error) {
    logger.error('Error adding attendee:', { error: error.stack });
    throw error;
  }
};

module.exports = {
  createEvent,
  getEvent,
  listEvents,
  updateEvent,
  deleteEvent,
  addAttendeeToEvent
};
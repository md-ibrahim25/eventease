import api from './api';

export type Attendee = {
  id: string;
  name: string;
  email: string;
};

// Get all attendees for an event
// GET /api/events/:eventId/attendees
// Response: { attendees: Attendee[] }
export const getAttendees = async (eventId: string) => {
  try {
    const response = await api.get(`/api/events/${eventId}/attendees`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};

// Create attendee
// POST /api/attendees/:eventId
// Request: Omit<Attendee, 'id'>
// Response: Event with updated attendees
export const createAttendee = async (eventId: string, data: Omit<Attendee, 'id'>) => {
  try {
    const response = await api.post(`/api/attendees/${eventId}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};

// Delete attendee
// Response: Event with updated attendees
export const deleteAttendee = async (eventId: string, attendeeId: string) => {
  try {
    const response = await api.delete(`/api/attendees/${eventId}/${attendeeId}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};
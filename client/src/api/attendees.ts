import api from './api';

export type Attendee = {
  id: string;
  name: string;
  email: string;
};

// Get all attendees
// GET /api/attendees
// Response: { attendees: Attendee[] }
export const getAttendees = () => {
  return new Promise<{ attendees: Attendee[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        attendees: [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com'
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com'
          }
        ]
      });
    }, 500);
  });
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
// DELETE /api/attendees/:id
// Response: { success: boolean }
export const deleteAttendee = (id: string) => {
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};
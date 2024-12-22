import api from './api';

export type Event = {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  image: string;
  attendees: string[];
  tasks: Task[];
};

export type Task = {
  id: string;
  name: string;
  deadline: string;
  status: 'pending' | 'completed';
  assignedTo: string;
};

// Get all events
// GET /api/events
// Response: { events: Event[] }
export const getEvents = async () => {
  console.log('Fetching events from API');
  try {
    const response = await api.get<Event[]>('/api/events');
    console.log('Received events from API:', response.data);
    return { events: response.data };
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error(error?.response?.data?.error || error.message);
  }
};

// Get single event
// GET /api/events/:id
// Response: { event: Event }
export const getEvent = async (id: string) => {
  try {
    const response = await api.get<Event>(`/api/events/${id}`);
    return { event: response.data };
  } catch (error) {
    console.error('Error fetching event:', error);
    throw new Error(error?.response?.data?.error || error.message);
  }
};

// Create event
// POST /api/events
// Request: Omit<Event, 'id'>
// Response: Event
export const createEvent = async (data: Omit<Event, 'id'>) => {
  console.log('Attempting to create event with data:', data);
  try {
    const response = await api.post<Event>('/api/events', data);
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error(error?.response?.data?.error || error.message);
  }
};

// Update event
// PUT /api/events/:id
// Request: Partial<Event>
// Response: Event
export const updateEvent = async (id: string, data: Partial<Event>) => {
  try {
    const response = await api.put<Event>(`/api/events/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw new Error(error?.response?.data?.error || error.message);
  }
};

// Delete event
// DELETE /api/events/:id
// Response: { success: boolean }
export const deleteEvent = async (id: string) => {
  try {
    const response = await api.delete(`/api/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw new Error(error?.response?.data?.error || error.message);
  }
};
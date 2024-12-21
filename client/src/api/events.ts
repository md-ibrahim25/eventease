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
export const getEvents = () => {
  return new Promise<{ events: Event[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        events: [
          {
            id: '1',
            name: 'Company Anniversary',
            description: 'Annual company celebration',
            location: 'Central Hall',
            date: '2024-04-15',
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
            attendees: ['John Doe', 'Jane Smith'],
            tasks: [
              {
                id: '1',
                name: 'Book venue',
                deadline: '2024-03-15',
                status: 'completed',
                assignedTo: 'John Doe'
              },
              {
                id: '2',
                name: 'Order catering',
                deadline: '2024-04-01',
                status: 'pending',
                assignedTo: 'Jane Smith'
              }
            ]
          },
          {
            id: '2',
            name: 'Product Launch',
            description: 'New product line announcement',
            location: 'Convention Center',
            date: '2024-05-20',
            image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2',
            attendees: ['John Doe', 'Jane Smith'],
            tasks: [
              {
                id: '3',
                name: 'Prepare presentation',
                deadline: '2024-05-10',
                status: 'pending',
                assignedTo: 'John Doe'
              }
            ]
          }
        ]
      });
    }, 500);
  });
};

// Get single event
// GET /api/events/:id
// Response: { event: Event }
export const getEvent = (id: string) => {
  return new Promise<{ event: Event }>((resolve) => {
    setTimeout(() => {
      resolve({
        event: {
          id: '1',
          name: 'Company Anniversary',
          description: 'Annual company celebration',
          location: 'Central Hall',
          date: '2024-04-15',
          image: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
          attendees: ['John Doe', 'Jane Smith'],
          tasks: [
            {
              id: '1',
              name: 'Book venue',
              deadline: '2024-03-15',
              status: 'completed',
              assignedTo: 'John Doe'
            },
            {
              id: '2',
              name: 'Order catering',
              deadline: '2024-04-01',
              status: 'pending',
              assignedTo: 'Jane Smith'
            }
          ]
        }
      });
    }, 500);
  });
};

// Create event
// POST /api/events
// Request: Omit<Event, 'id'>
// Response: Event
export const createEvent = (data: Omit<Event, 'id'>) => {
  return new Promise<Event>((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(),
        ...data
      });
    }, 500);
  });
};

// Update event
// PUT /api/events/:id
// Request: Partial<Event>
// Response: Event
export const updateEvent = (id: string, data: Partial<Event>) => {
  return new Promise<Event>((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: data.name || '',
        description: data.description || '',
        location: data.location || '',
        date: data.date || '',
        image: data.image || '',
        attendees: data.attendees || [],
        tasks: data.tasks || []
      });
    }, 500);
  });
};

// Delete event
// DELETE /api/events/:id
// Response: { success: boolean }
export const deleteEvent = (id: string) => {
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};
import api from './api';
import type { Task } from './events';

// Get tasks for event
// GET /api/events/:eventId/tasks
// Response: { tasks: Task[] }
export const getEventTasks = async (eventId: string) => {
  console.log(`Making GET request to /api/events/${eventId}/tasks`);
  try {
    const response = await api.get(`/api/events/${eventId}/tasks`);
    console.log('Response from getEventTasks:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getEventTasks:', error);
    throw new Error(error?.response?.data?.error || error.message);
  }
};

// Create task
// POST /api/events/:eventId/tasks
// Request: Omit<Task, 'id'>
// Response: Task
export const createTask = async (eventId: string, data: Omit<Task, 'id'>) => {
  try {
    const response = await api.post(`/api/events/${eventId}/tasks`, {
      ...data,
      assignedTo: data.assignedTo._id
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};

// Update task
// PUT /api/events/:eventId/tasks/:taskId
// Request: Partial<Task>
// Response: Task
export const updateTask = (eventId: string, taskId: string, data: Partial<Task>) => {
  return new Promise<Task>((resolve) => {
    setTimeout(() => {
      resolve({
        id: taskId,
        name: data.name || '',
        deadline: data.deadline || '',
        status: data.status || 'pending',
        assignedTo: data.assignedTo || ''
      });
    }, 500);
  });
};

// Delete task
// DELETE /api/events/:eventId/tasks/:taskId
// Response: { success: boolean }
export const deleteTask = (eventId: string, taskId: string) => {
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};
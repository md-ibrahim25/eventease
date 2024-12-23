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
export const updateTask = async (eventId: string, taskId: string, data: Partial<Task>) => {
  try {
    console.log('Updating task with data:', data);
    const response = await api.put(`/api/events/${eventId}/tasks/${taskId}`, {
      ...data,
      assignedTo: data.assignedTo?._id || data.assignedTo
    });
    console.log('Update task response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error(error?.response?.data?.error || error.message);
  }
};

// Delete task
// DELETE /api/events/:eventId/tasks/:taskId
// Response: { success: boolean }
export const deleteTask = async (eventId: string, taskId: string) => {
  try {
    const response = await api.delete(`/api/events/${eventId}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};
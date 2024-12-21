import api from './api';
import type { Task } from './events';

// Get tasks for event
// GET /api/events/:eventId/tasks
// Response: { tasks: Task[] }
export const getEventTasks = (eventId: string) => {
  return new Promise<{ tasks: Task[] }>((resolve) => {
    setTimeout(() => {
      resolve({
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
      });
    }, 500);
  });
};

// Create task
// POST /api/events/:eventId/tasks
// Request: Omit<Task, 'id'>
// Response: Task
export const createTask = (eventId: string, data: Omit<Task, 'id'>) => {
  return new Promise<Task>((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(),
        ...data
      });
    }, 500);
  });
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
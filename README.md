```markdown
#EventEase

EventEase is a web-based Event Management Dashboard designed to streamline the organization and management of events. It provides features for user authentication, event and attendee management, task tracking, and real-time updates. The application is built with a modern tech stack including ReactJS for the frontend and Express.js for the backend, ensuring a responsive and dynamic user experience.

## Overview

EventEase is structured into two main parts: the frontend and the backend.

### Architecture and Technologies

- **Frontend**: Built with ReactJS and Vite, using the shadcn-ui component library and Tailwind CSS for styling. Client-side routing is handled by `react-router-dom`.
- **Backend**: Implemented with Express.js, providing REST API endpoints. MongoDB is used for database management with Mongoose for object modeling. Authentication is handled using JWT tokens.
- **Real-Time Updates**: WebSockets (e.g., Socket.IO) are used to ensure real-time data synchronization across all users.
- **Responsive Design**: The dashboard is designed to be fully functional and user-friendly on both desktop and mobile devices.

### Project Structure

- **Frontend**: Located in the `client/` directory.
  - `client/src/pages/`: Contains page components like Home, Login, Register, Events, Attendees, Tasks, and Calendar.
  - `client/src/components/`: Contains reusable UI components.
  - `client/src/api/`: Contains API request functions.
- **Backend**: Located in the `server/` directory.
  - `server/routes/`: Contains route definitions for authentication, events, attendees, and tasks.
  - `server/models/`: Contains Mongoose schemas for Event and User.
  - `server/services/`: Contains service logic for handling business operations.
  - `server/utils/`: Contains utility functions for logging, authentication, and password management.

## Features

- **User Authentication**: Secure registration and login using JWT-based authentication.
- **Event Management**: Create, view, edit, and delete events with details like name, description, location, date, attendees, and tasks.
- **Attendee Management**: Add and delete attendees, and assign them to events or tasks.
- **Task Tracker**: Manage tasks associated with events, including adding, viewing, deleting, and updating tasks. Visualize task completion with a progress bar.
- **Calendar View**: Display events on a calendar, with clickable events to view or edit details.
- **Real-Time Updates**: Dynamic reflection of changes to events, tasks, or attendees for all users.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Getting Started

### Requirements

To run EventEase, you need to have the following technologies installed on your computer:

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB (v4.x or later)

### Quickstart

Follow these steps to set up and run the project:

1. **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd EventEase
    ```

2. **Install Dependencies**:
    - For the backend:
        ```bash
        cd server
        npm install
        ```
    - For the frontend:
        ```bash
        cd client
        npm install
        ```

3. **Set Up Environment Variables**:
    - Create a `.env` file in the `server/` directory with the following variables:
        ```
        PORT=3000
        MONGODB_URI=<your-mongodb-uri>
        JWT_SECRET=<your-jwt-secret>
        ```

4. **Run the Application**:
    - Start both the frontend and backend using Concurrently:
        ```bash
        npm run start
        ```

5. **Access the Application**:
    - Open your browser and navigate to `http://localhost:5173` to access the EventEase dashboard.

### License

The project is proprietary (not open source), Copyright (c) 2024.
```

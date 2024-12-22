```markdown
# EventEase

EventEase is a comprehensive web-based Event Management Dashboard designed to streamline the process of organizing and managing events. It includes features such as user authentication, event management, attendee management, task tracking, and real-time updates. The application is built with a responsive design to ensure a seamless user experience on both desktop and mobile devices.

## Overview

EventEase is developed using a modern tech stack comprising ReactJS for the frontend and Express.js for the backend. The frontend is built with Vite as the development server and styled using Tailwind CSS with the Shadcn-UI component library. The backend leverages MongoDB for data storage and JWT for secure user authentication. The application supports real-time updates using WebSockets.

### Project Structure

- **Frontend**: Located in the `client/` directory.
  - **Tech Stack**: ReactJS, Vite, Tailwind CSS, Shadcn-UI, Axios, React Router.
  - **Folder Structure**:
    - `client/src/pages/`: Contains page components (e.g., `Login`, `Register`, `Events`, `Calendar`).
    - `client/src/components/`: Contains reusable UI components (e.g., `Button`, `Input`, `Modal`).
    - `client/src/api/`: Contains API request functions with mock data for frontend testing.
    - `client/src/contexts/`: Context providers for global state management (e.g., `AuthContext`).
    - `client/src/hooks/`: Custom hooks for additional functionalities (e.g., `useToast`, `useIsMobile`).

- **Backend**: Located in the `server/` directory.
  - **Tech Stack**: Express.js, MongoDB, Mongoose, JWT, WebSockets.
  - **Folder Structure**:
    - `server/models/`: Mongoose models for defining database schemas (e.g., `User`, `Event`).
    - `server/routes/`: Express routes for handling API requests (e.g., `auth.js`, `events.js`, `attendees.js`).
    - `server/services/`: Business logic for handling data operations (e.g., `user.js`, `event.js`).
    - `server/utils/`: Utility functions for common tasks (e.g., `auth.js`, `log.js`, `password.js`).

## Features

- **User Authentication**: Secure JWT-based authentication for user registration and login.
- **Event Management**: Create, view, edit, and delete events with details such as name, description, location, date, attendees, and tasks.
- **Attendee Management**: Add and delete attendees, assign them to specific events or tasks.
- **Task Tracker**: Add, view, delete, and update tasks associated with events, with fields such as name, deadline, status, and assigned attendee. A progress bar visualizes task completion for each event.
- **Calendar View**: Visual representation of events on a calendar, with clickable events for detailed view or editing.
- **Real-Time Updates**: Dynamic reflection of changes to events, tasks, or attendees for all users using WebSockets.
- **Responsive Design**: Fully functional and user-friendly on both desktop and mobile devices.

## Getting Started

### Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4 or higher)

### Quickstart

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/eventease.git
    cd eventease
    ```

2. **Set up the backend**:
    ```sh
    cd server
    cp .env.example .env
    # Update the .env file with your MongoDB URL and JWT secrets
    npm install
    npm run dev
    ```

3. **Set up the frontend**:
    ```sh
    cd client
    npm install
    npm run dev
    ```

4. **Access the application**:
    Open your browser and navigate to `http://localhost:5173` to start using EventEase.

### License

The project is proprietary (not open source). Copyright (c) 2024.
```
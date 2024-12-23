# EventEase

EventEase is a comprehensive web-based Event Management Dashboard designed to streamline the organization and management of events. The application features user authentication, event and attendee management, task tracking, and real-time updates. It provides a responsive design that ensures functionality across both desktop and mobile devices.

## Overview

EventEase is built with a modern tech stack, leveraging ReactJS for the frontend and Express.js for the backend. The frontend uses Vite for development, the shadcn-ui component library, and Tailwind CSS for styling. The backend is powered by MongoDB for data storage and JWT-based authentication for secure user management. The application architecture ensures a seamless user experience with real-time updates using WebSockets.

### Project Structure

The project is divided into two main parts:

1. **Frontend** (`client/`):
    - **Framework**: ReactJS
    - **Development Server**: Vite
    - **Styling**: Tailwind CSS with shadcn-ui components
    - **Routing**: `react-router-dom`
    - **State Management**: React Context API for authentication
    - **API Calls**: Axios for HTTP requests

2. **Backend** (`server/`):
    - **Framework**: Express.js
    - **Database**: MongoDB with Mongoose
    - **Authentication**: JWT (JSON Web Tokens)
    - **Real-Time Updates**: WebSockets (Socket.IO)

## Features

1. **User Authentication**: Secure registration and login using JWT-based authentication.
2. **Event Management**:
    - Create, view, edit, and delete events.
    - Each event includes details such as name, description, location, date, attendees, and tasks.
3. **Attendee Management**:
    - Add and delete attendees.
    - Assign attendees to specific events or tasks.
4. **Task Tracker**:
    - Add, view, delete, and update tasks associated with events.
    - Tasks include fields such as name, deadline, status (Pending/Completed), and assigned attendee.
    - A progress bar visualizes task completion for each event.
5. **Calendar View**: Events are displayed on a calendar, with detailed views available on click.
6. **Real-Time Updates**: Changes to events, tasks, or attendees are dynamically reflected for all users using WebSockets.
7. **Responsive Design**: The dashboard is fully functional and user-friendly on both desktop and mobile devices.

## Getting Started

### Requirements

To run the project locally, you need to have the following installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4 or higher)

### Quickstart

1. **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd EventEase
    ```

2. **Set up environment variables**:
    - Create a `.env` file in the `server/` directory with the following content:
      ```sh
      PORT=3000
      DATABASE_URL=mongodb://localhost/eventease
      JWT_SECRET=your_jwt_secret
      REFRESH_TOKEN_SECRET=your_refresh_token_secret
      ```

3. **Install dependencies**:
    - Install backend dependencies:
      ```sh
      cd server
      npm install
      ```
    - Install frontend dependencies:
      ```sh
      cd ../client
      npm install
      ```

4. **Run the application**:
    - Start the backend server:
      ```sh
      cd server
      npm run start
      ```
    - Start the frontend development server:
      ```sh
      cd ../client
      npm run start
      ```

5. **Access the application**:
    - Open your browser and navigate to `http://localhost:5173` to use the EventEase dashboard.


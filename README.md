# MERN Notes Application

## Description

This is a full-stack MERN (MongoDB, Express, React, Node.js) application divided into two main parts: **backend** and **frontend**.

### Backend

- Built with **Express**, **Mongoose**, and **CORS**.
- MongoDB is used as the database to store user and notes data.
- Data is exchanged in JSON format.
- The backend exposes the following REST API endpoints (all `POST` requests):
  - `/login` - authenticate a user.
  - `/signup` - register a new user.
  - `/add-new-note` - add a new note.
  - `/fetch-notes` - fetch all notes for a user.
  - `/delete-note` - delete a specific note.
- Each API response returns an appropriate HTTP status code.

### Frontend

- Built with **React** (without using Vite).
- Utilizes React hooks such as `useEffect` and `useState` to manage state and lifecycle events.
- Communicates with the backend via fetch API calls (no axios used).
- Displays notes and user authentication features.

## Testing

- The backend API endpoints were tested using **Postman**.
- Postman was used to send HTTP requests and verify JSON responses along with the status codes.
- This ensured proper communication between frontend and backend.

## Usage

- Register a new user via `/signup`.
- Login via `/login`.
- Once logged in, add, fetch, and delete notes through the UI which interacts with the backend routes.
  
## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Mongoose
- CORS

## Notes

- The backend uses JSON for request and response payloads.
- All API routes respond with relevant HTTP status codes to indicate success or failure.
- Frontend uses React hooks (`useState`, `useEffect`) for efficient state management.

---

Feel free to customize this README according to your project specifics!

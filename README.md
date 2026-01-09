# Full-Stack Project Management Tool

A comprehensive project management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **Project Management**: Create, view, delete projects. Track status and deadlines.
- **Task Management**: Add tasks to projects, assign users, and update status (Pending -> In Progress -> Done).
- **Dashboard**: Overview of all active projects.
- **Board View**: Kanban-style/List view for tasks within a specific project.

## Project Structure
- `/client`: React frontend (Vite + Tailwind CSS).
- `/server`: Node.js backend (Express + Mongoose).

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas URI)

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Create a `.env` file in the `server` directory.
   - Add the following variables:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     ```
4. Start the server:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   App will run on `http://localhost:5173`.

## Deployment Guide

### Frontend (Netlify/Vercel)
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- Ensure you set up redirects for SPA if using Netlify (create a `_redirects` file with content `/* /index.html 200`).

### Backend (Render/Heroku)
- **Build Command**: `npm install`
- **Start Command**: `node index.js`
- **Environment Variables**: Set `MONGODB_URI` in their dashboard.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router, Lucide React.
- **Backend**: Node.js, Express, Mongoose, CORS, Dotenv.
- **Database**: MongoDB.

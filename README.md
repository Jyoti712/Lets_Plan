# LetsPlann - Task Management Application

A modern, full-stack task management application built with the MERN stack.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete tasks
- Set task priorities (low, medium, high)
- Add deadlines with countdown timers
- Visual indicators for upcoming and overdue tasks
- Filter tasks by status (all, active, completed)
- Responsive design for all devices

## Technologies Used

### Frontend
- React 18 with hooks
- React Router v7
- Tailwind CSS for styling
- Formik & Yup for form validation
- date-fns for date handling
- React Toastify for notifications
- Axios for API requests
- React Icons

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT Authentication with HTTP-only cookies
- bcrypt for password hashing

## Architecture

The application follows a modern client-server architecture:
- **Frontend**: Single-page React application in the project root
- **Backend**: RESTful API built with Express.js in the `/server` directory
- **Database**: MongoDB Atlas for data persistence

## Project Structure

```
LetsPlann/
├── public/                # Static assets
├── src/                   # Frontend source files
│   ├── components/        # React components
│   ├── context/           # Context API files
│   ├── screens/           # Page components
│   └── services/          # API service functions
├── server/                # Backend code
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Express middlewares
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── server.js      # Entry point
│   └── .env               # Backend environment variables
└── .env                   # Frontend environment variables
```

## Database Schema

### Users Collection
```
{
     _id: ObjectId,
     username: String,
     email: String,
     password: String (hashed),
     createdAt: Date
}
```

### Tasks Collection
```
{
     _id: ObjectId,
     title: String,
     description: String,
     completed: Boolean,
     userId: ObjectId (reference to Users collection),
     createdAt: Date,
     updatedAt: Date
}
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Git
- MongoDB Atlas account or local MongoDB installation


## Developer
Jyotirmayee Sahoo

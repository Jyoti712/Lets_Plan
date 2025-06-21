# LetsPlann - Task Management Application

A modern, full-stack task management application built with the MERN stack.

## Live Demo
Visit the live application: https://lets-plan-orcin.vercel.app/

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

### Clone the Repository
```
git clone https://github.com/JITESH-KUMAR05/LetsPlann.git
cd LetsPlann
```

### Frontend Setup
```
# Install frontend dependencies
npm install

# Create .env file in project root
echo "VITE_API_URL=http://localhost:5000" > .env.development
```

### Backend Setup
```
# Navigate to server directory
cd server

# Install backend dependencies
npm install
```

Create a `.env` file in the server directory with:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

**Important**: Replace your_mongodb_connection_string with your actual MongoDB connection string and your_secret_key with a secure random string.

### MongoDB Setup
1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Add a database user with read/write permissions
4. Get your connection string from "Connect" > "Connect your application"
5. Add your IP address to the network access whitelist

## Running the Application Locally

### Start the Backend Server
```
# Navigate to server directory
cd server

# Start development server
npm run dev
```
The server will run on port 5000 by default.

### Start the Frontend Development Server
```
# In a new terminal, navigate to project root
cd LetsPlann

# Start development server
npm run dev
```
The frontend will be available at http://localhost:5173

## API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/users | Register new user |
| POST   | /api/users/login | Login user |
| POST   | /api/users/logout | Logout user |
| GET    | /api/users/profile | Get current user profile |
| GET    | /api/todos | Get all todos for logged in user |
| POST   | /api/todos | Create a new todo |
| GET    | /api/todos/:id | Get a specific todo |
| PUT    | /api/todos/:id | Update a todo |
| DELETE | /api/todos/:id | Delete a todo |

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variable: `VITE_API_URL=https://your-backend-url.com`
4. Deploy

### Backend (Render)
1. Push your code to GitHub
2. Create a new Web Service on Render connected to your repository
3. Set the build command: `cd server && npm install && npm run build`
4. Set the start command: `cd server && npm start`
5. Add environment variables from your `.env` file
6. Deploy

## Troubleshooting
- **CORS Issues**: Ensure the FRONTEND_URL in backend .env is correct
- **Authentication Problems**: Check if cookies are being properly set
- **MongoDB Connection Errors**: Verify network access settings in MongoDB Atlas

## Developer Notes
- The application uses HTTP-only cookies for authentication to enhance security
- MongoDB connection string should include proper URL encoding for special characters
- All API endpoints are protected except for user registration and login

## Future Enhancements
- Task categories and tags
- Collaborative tasks and sharing
- Email notifications for deadlines
- Dark mode support
- Mobile application with React Native

## Developer
Jitesh Kumar

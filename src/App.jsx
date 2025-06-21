import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import Navbar from './Components/Navbar';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TodoDetailScreen from './screens/TodoDetailScreen';
import CreateTodoScreen from './screens/CreateTodoScreen';
import EditTodoScreen from './screens/EditTodoScreen';
import './App.css';

// Add this near the top to debug
console.log('API URL:', import.meta.env.VITE_API_URL || 'using fallback');

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/" element={
                <PrivateRoute>
                  <HomeScreen />
                </PrivateRoute>
              } />
              <Route path="/todos/:id" element={
                <PrivateRoute>
                  <TodoDetailScreen />
                </PrivateRoute>
              } />
              <Route path="/create" element={
                <PrivateRoute>
                  <CreateTodoScreen />
                </PrivateRoute>
              } />
              <Route path="/edit/:id" element={
                <PrivateRoute>
                  <EditTodoScreen />
                </PrivateRoute>
              } />
            </Routes>
          </div>
          <ToastContainer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
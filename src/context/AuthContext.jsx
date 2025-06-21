import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api'; 

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data } = await api.get('/api/users/profile');
        setUser(data);
      } catch (error) {
        console.log('Not authenticated');
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/users/login', { email, password });
     
      setUser(data);
      
      localStorage.setItem('userInfo', JSON.stringify({
        ...data,
        token: data.token  
      }));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post('/api/users', 
        { name, email, password }, 
        { withCredentials: true }
      );
      setUser(data);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/users/logout', {}, { withCredentials: true });
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
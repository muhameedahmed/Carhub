import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'https://site95578-50nujg.scloudsite101.com/public/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('userData');
    
    if (token && storedUserData) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(storedUserData));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [isAuthenticated]);

  const login = async (identifier, password) => {
    try {
      const response = await api.post('/login', { identifier, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(user));
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setIsAuthenticated(true);
      setUserData(user);
      
      toast.success('Login successful!');
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid credentials. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    delete api.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUserData(null);
    navigate('/');
  };

  const changePassword = async (phone, newPassword) => {
    try {
      const response = await api.post('/changePassword', { 
        phone, 
        new_password: newPassword 
      });
      
      toast.success('Password updated successfully!');
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      toast.error('Failed to update password. Please try again.');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, login, logout, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
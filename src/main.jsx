import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';  
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>  
      <AuthProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);

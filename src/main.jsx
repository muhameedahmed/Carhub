import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';  // Changed here
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>  {/* Use HashRouter instead of BrowserRouter */}
      <AuthProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);

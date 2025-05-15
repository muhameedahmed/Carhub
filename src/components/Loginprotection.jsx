import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Loginprotection = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default Loginprotection;

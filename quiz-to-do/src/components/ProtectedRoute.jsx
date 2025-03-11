// Import necessary routing and authentication utilities
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/Auth.jsx';

/**
 * Protected Route Component
 * Wraps routes that require authentication
 * Redirects to login page if user is not authenticated
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when authenticated
 */
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
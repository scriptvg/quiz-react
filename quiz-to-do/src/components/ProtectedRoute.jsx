import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/Auth.jsx';

function ProtectedRoute({ children }) {
  // Obtiene el usuario autenticado desde el contexto de autenticación
  const { user } = useAuth();
  
  // Si no hay un usuario autenticado, redirige a la página de inicio de sesión
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si hay un usuario autenticado, renderiza los componentes hijos
  return children;
}

export default ProtectedRoute;
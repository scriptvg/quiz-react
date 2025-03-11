// Importar hooks y utilidades necesarias de React
import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear un contexto para la gestión del estado de autenticación
const AuthContext = createContext(null);

/**
 * Componente AuthProvider que gestiona el estado de autenticación
 * Proporciona funcionalidad de inicio/cierre de sesión y gestión del estado del usuario
 * Persiste los datos del usuario en localStorage
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener usuario almacenado al cargar el componente
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función para iniciar sesión y guardar datos del usuario
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Función para cerrar sesión y eliminar datos del usuario
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
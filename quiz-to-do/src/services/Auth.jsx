// Importamos las dependencias necesarias de React
import React, { createContext, useState, useContext, useEffect } from 'react';

// Creamos un contexto de autenticación
const AuthContext = createContext(null);

// Componente proveedor de autenticación que maneja el estado del usuario
export const AuthProvider = ({ children }) => {
  // Estado para almacenar la información del usuario
  const [user, setUser] = useState(null);

  // Efecto que se ejecuta al montar el componente para verificar si hay un usuario en sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función para iniciar sesión: actualiza el estado y guarda en sessionStorage
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  // Función para cerrar sesión: limpia el estado y elimina de sessionStorage
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  // Renderiza el provider con el contexto y sus valores
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
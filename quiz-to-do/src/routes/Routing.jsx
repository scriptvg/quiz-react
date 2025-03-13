import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Inicio from '../pages/Inicio';
import Login from "../pages/Login";
import Register from '../pages/register';
import { AuthProvider } from '../services/Auth'
import ProtectedRoute from '../components/ProtectedRoute'

function Routing() {
  return (
    // Proveedor de autenticación
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta para la página de inicio de sesión */}
          <Route path="/login" element={<Login />} />
          {/* Ruta para la página de registro */}
          <Route path="/register" element={<Register />} />
          {/* Ruta protegida para la página de inicio */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Inicio />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default Routing

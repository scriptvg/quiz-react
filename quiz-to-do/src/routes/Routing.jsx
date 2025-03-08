import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Inicio from '../pages/inicio';
import Login from '../pages/login';
import Register from '../pages/register';
import { AuthProvider } from '../services/Auth'
import ProtectedRoute from '../components/ProtectedRoute'

function Routing() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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

import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Inicio from '../pages/inicio';
import Login from '../pages/login';
import Register from '../pages/register';
import { AuthProvider } from '../services/Auth'
import ProtectedRoute from '../components/ProtectedRoute'
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

function Routing() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default Routing

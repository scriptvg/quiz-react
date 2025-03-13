// Importar hooks y componentes necesarios de React
import React, { useState } from 'react'
// Importar hooks y componentes relacionados con el enrutamiento de react-router-dom
import { Link, useLocation, useNavigate } from 'react-router-dom'
// Importar iconos de Lucide para elementos de la interfaz de usuario
import { UserCircle, Menu, X, LogOut } from 'lucide-react'
// Importar el logo de React desde los assets
import reactLogo from '../../assets/react.svg'
// Importar estilos personalizados para la barra de navegación
import "../../styles/NavBar.css"
// Importar el hook del contexto de autenticación
import { useAuth } from '../../services/Auth'

// Definición del componente NavBar
function NavBar() {
  // Estado para gestionar el toggle del menú móvil
  const [isOpen, setIsOpen] = useState(false)
  // Obtener la ubicación actual para resaltar los enlaces activos
  const location = useLocation()
  // Función de navegación para redirigir a los usuarios programáticamente
  const navigate = useNavigate()
  // Extraer el usuario y la función de logout del contexto de autenticación
  const { user, logout } = useAuth()

  // Función auxiliar para verificar si un enlace está activo basado en la ruta actual
  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Barra de navegación principal, fija en la parte superior con efecto de sombra */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container py-2">
          {/* Logo de la aplicación y título que enlaza a la página de inicio */}
          <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
            <img src={reactLogo} alt="To Do App" height="30" className="logo-spin" />
            Quiz App
          </Link>
          
          {/* Mobile menu toggle button */}
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            {/* Toggle between X and Menu icons based on menu state */}
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Collapsible navigation content */}
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            {/* Central welcome message showing user's name */}
            <ul className="navbar-nav mx-auto">
              <h1>¡Bienvenido, {user.nombre}!</h1>
            </ul>
            
            {/* Right-aligned authentication controls */}
            <div className="d-flex align-items-center gap-3">
              {/* Conditional rendering based on authentication state */}
              {user ? (
                // Logout button for authenticated users
                <button 
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }} 
                  className="btn btn-outline-danger px-4 d-flex align-items-center gap-2"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              ) : (
                // Login and Register links for unauthenticated users
                <>
                  <Link 
                    to="/login" 
                    className={`btn ${isActive('/login') ? 'btn-primary' : 'btn-outline-primary'} px-4`}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className={`btn ${isActive('/register') ? 'btn-primary' : 'btn-outline-primary'} px-4 d-flex align-items-center gap-2`}
                  >
                    <UserCircle size={20} />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="navbar-spacer"></div>
      {/* Task counter component - Note: This appears to be a leftover from a to-do app and may cause errors */}
      <ContadorTareas tareas={tareas} /> {/* Incluir el componente ContadorTareas */}
    </>
  )
}

// Export the NavBar component for use in other parts of the application
export default NavBar

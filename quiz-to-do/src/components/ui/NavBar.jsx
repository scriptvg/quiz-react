import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserCircle, Menu, X, LogOut, CheckSquare } from 'lucide-react';
import { useAuth } from '../../services/Auth';
import reactLogo from '../../assets/react.svg';
import "../../styles/NavBar.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const cerrarSesion = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container py-2">
          <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to={user ? '/dashboard' : '/'}>
            <img src={reactLogo} alt="To Do App" className="logo-spin" height="30" />
            <span className="d-flex align-items-center gap-1">
              Task<span className="text-primary">Master</span>
              <CheckSquare size={20} className="text-primary" />
            </span>
          </Link>
          
          <button 
            className="navbar-toggler border-0 p-1" 
            type="button" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <ul className="navbar-nav mx-auto">
              {user ? (
                <>
                  <li className="nav-item px-2">
                    <Link 
                      className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} 
                      to="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item px-2">
                    <Link 
                      className={`nav-link ${isActive('/profile') ? 'active' : ''}`} 
                      to="/profile"
                    >
                      Perfil
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item px-2">
                  <Link 
                    className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                    to="/"
                  >
                    Home
                  </Link>
                </li>
              )}
            </ul>
            
            <div className="d-flex align-items-center gap-3">
              {user ? (
                <>
                  <span className="d-none d-lg-inline text-muted">
                    Bienvenido, {user.nombre}
                  </span>
                  <button 
                    onClick={cerrarSesion}
                    className="btn btn-outline-danger px-4 d-flex align-items-center gap-2"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </>
              ) : (
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
      <div className="navbar-spacer"></div>
    </>
  );
}

export default NavBar;

import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserCircle, Menu, X } from 'lucide-react'
import reactLogo from '../../assets/react.svg'
import "../../styles/NavBar.css"

function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container py-2">
          <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
            <img src={reactLogo} alt="To Do App" height="30" />
            To Do App
          </Link>
          
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item px-2">
                <Link 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link 
                  className={`nav-link ${isActive('/quizzes') ? 'active' : ''}`} 
                  to="/quizzes"
                >
                  Quizzes
                </Link>
              </li>
            </ul>
            
            <div className="d-flex align-items-center gap-3">
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
            </div>
          </div>
        </div>
      </nav>
      <div className="navbar-spacer"></div>
    </>
  )
}

export default NavBar

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import "bootstrap/dist/css/bootstrap.min.css"
import "@popperjs/core"
import "bootstrap/dist/js/bootstrap.bundle.min"
import Swal from 'sweetalert2'
import usersCalls from '../services/usersCalls'
import "../styles/CardRegister.css"

// Componente de registro de usuarios
function CardRegister() {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors = {
      nombre: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
    let isValid = true

    // Validar nombre
    if (!nombre.trim()) {
      newErrors.nombre = 'Name is required'
      isValid = false
    }

    // Validar email
    if (!email) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email'
      isValid = false
    }

    // Validar contraseña
    if (!password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    // Validar confirmación de contraseña
    if (!passwordConfirm) {
      newErrors.passwordConfirm = 'Please confirm your password'
      isValid = false
    } else if (password !== passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Función para manejar cambios en los campos del formulario
  const manejarCambioInput = (field, value) => {
    switch (field) {
      case 'nombre':
        setNombre(value)
        if (errors.nombre) setErrors({ ...errors, nombre: '' })
        break
      case 'email':
        setEmail(value)
        if (errors.email) setErrors({ ...errors, email: '' })
        break
      case 'password':
        setPassword(value)
        if (errors.password) setErrors({ ...errors, password: '' })
        break
      case 'passwordConfirm':
        setPasswordConfirm(value)
        if (errors.passwordConfirm) setErrors({ ...errors, passwordConfirm: '' })
        break
      default:
        break
    }
  }

  // Función para registrar un nuevo usuario
  const register = async () => {
    if (!validateForm()) return

    try {
      setIsLoading(true)
      await usersCalls.PostUsers(nombre.trim(), email.trim(), password.trim())
      
      await Swal.mixin({
        icon: 'success',
        title: 'Success',
        text: 'User registered successfully',
        toast: true,
        position: 'top-end', // Cambiar la posición aquí
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      }).fire();
      
      // Resetear formulario
      setNombre('')
      setEmail('')
      setPassword('')
      setPasswordConfirm('')
      
    } catch (error) {
      console.error('Registration error:', error)
      Swal.mixin({
        icon: 'error',
        title: 'Error',
        text: 'Error registering user',
        toast: true,
        position: 'top-end', // Cambiar la posición aquí
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      }).fire();
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="register-container">
      <div className="formRegister shadow">
        <h1 className="text-center mb-4">Create Account</h1>

        <div className="mb-4">
          <label htmlFor="nombre" className="form-label">Name</label>
          <input 
            value={nombre} 
            onChange={(e) => manejarCambioInput('nombre', e.target.value)} 
            type="text" 
            className={`form-control form-control-lg ${errors.nombre ? 'is-invalid' : ''}`}
            id="nombre" 
            placeholder="Enter your name"
            disabled={isLoading}
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            value={email} 
            onChange={(e) => manejarCambioInput('email', e.target.value)} 
            type="email" 
            className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
            id="email" 
            placeholder="name@example.com"
            disabled={isLoading}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group input-group-lg">
            <input 
              value={password} 
              onChange={(e) => manejarCambioInput('password', e.target.value)} 
              type={showPassword ? "text" : "password"} 
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password" 
              placeholder="••••••••"
              disabled={isLoading}
            />
            <button 
              className="btn btn-outline-secondary d-flex align-items-center justify-content-center" 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <div className="input-group input-group-lg">
            <input 
              value={passwordConfirm} 
              onChange={(e) => manejarCambioInput('passwordConfirm', e.target.value)} 
              type={showConfirmPassword ? "text" : "password"} 
              className={`form-control ${errors.passwordConfirm ? 'is-invalid' : ''}`}
              id="confirmPassword" 
              placeholder="••••••••"
              disabled={isLoading}
            />
            <button 
              className="btn btn-outline-secondary d-flex align-items-center justify-content-center" 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.passwordConfirm && <div className="invalid-feedback">{errors.passwordConfirm}</div>}
          </div>
        </div>

        <button 
          type="button" 
          onClick={register} 
          className="btn btn-primary btn-lg w-100"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Loading...
            </>
          ) : (
            'Register'
          )}
        </button>
      </div>
    </div>
  )
}

export default CardRegister

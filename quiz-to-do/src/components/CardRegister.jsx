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
  // Estados para manejar los campos del formulario
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  
  // Estados para controlar la visibilidad de las contraseñas
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Manejadores de cambios en los campos del formulario
  const nameUser = (e) => setNombre(e.target.value)
  const emailUser = (e) => setEmail(e.target.value)
  const passwordUser = (e) => setPassword(e.target.value)
  const passwordConfirmUser = (e) => setPasswordConfirm(e.target.value)

  // Funciones para mostrar/ocultar contraseñas
  const togglePassword = () => setShowPassword(!showPassword)
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)  

  // Función para manejar el registro de usuarios
  const register = async (e) => {
    // Validación de contraseñas coincidentes
    if (password !== passwordConfirm) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden'
      });
      return;
    }

    // Validación de campos requeridos
    if (!nombre || !email || !password || !passwordConfirm) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios'
      });
      return;
    }

    try {
      // Intento de registro del usuario
      await usersCalls.PostUsers(nombre.trim(), email.trim(), password.trim());
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario registrado correctamente'
      });
      // Aquí podrías agregar redirección al login
    } catch(err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al registrar el usuario'
      });
    }
  } 

  

  return (
    <div className="register-container">
      <div className="formRegister shadow">
        <h1 className="text-center mb-4">Crear Cuenta</h1>

          {/* Campo de nombre */}
          <div className="mb-4">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input value={nombre} onChange={nameUser} type="text" className="form-control form-control-lg" id="nombre" placeholder="Ingrese su nombre"/>
          </div>

          {/* Campo de email */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input value={email} onChange={emailUser} type="email" className="form-control form-control-lg" id="email" placeholder="nombre@ejemplo.com"/>
          </div>

          {/* Campo de contraseña */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <div className="input-group input-group-lg">
              <input value={password} onChange={passwordUser} type={showPassword ? "text" : "password"} className="form-control" id="password" placeholder="••••••••"/>
              <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center" type="button" onClick={togglePassword}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Campo de confirmación de contraseña */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
            <div className="input-group input-group-lg">
              <input value={passwordConfirm} onChange={passwordConfirmUser} type={showConfirmPassword ? "text" : "password"} className="form-control" id="confirmPassword" placeholder="••••••••"/>
              <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center" type="button" onClick={toggleConfirmPassword}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Botón de registro */}
          <button type="button" onClick={register} className="btn btn-primary btn-lg w-100">
            Registrarse
          </button>
      </div>
    </div>
  )
}

export default CardRegister

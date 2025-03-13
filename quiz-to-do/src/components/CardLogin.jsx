// Importación de dependencias necesarias para el componente
import React, { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/Auth'
import usersCalls from '../services/usersCalls'
import Swal from 'sweetalert2'
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/CardLogin.css"

// Componente funcional para el formulario de inicio de sesión
function CardLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Efecto para obtener los datos de los usuarios al cargar el componente
  useEffect(() => {
    async function fetchDataUsers() {
      try {
        setIsLoading(true);
        const datos = await usersCalls.GetUsers();
        setUsers(datos);
      } catch (error) {
        // Mostrar alerta de error si falla la carga de datos
        Swal.mixin({
          icon: 'error',
          title: 'Error',
          text: 'Error loading users data',
          toast: true,
          position: 'top-end', // Cambiar la posición aquí
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        }).fire();
      } finally {
        setIsLoading(false);
      }
    }

    fetchDataUsers();
  }, []);

  // Función para validar el formulario
  function validateForm() {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!emailUser) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailUser)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!passwordUser) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  // Función para manejar el cambio en el campo de email
  function email(event) {
    if (event && event.target) {
      setEmailUser(event.target.value);
      if (errors.email) setErrors({ ...errors, email: "" });
    }
  }

  // Función para manejar el cambio en el campo de contraseña
  function password(event) {
    if (event && event.target) {
      setPasswordUser(event.target.value);
      if (errors.password) setErrors({ ...errors, password: "" });
    }
  }

  // Función para manejar el inicio de sesión
  async function ingresar() {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const user = users.find(user => user.email === emailUser && user.password === passwordUser);

      if (!user) {
        // Mostrar alerta de error si el email o la contraseña son inválidos
        Swal.mixin({
          icon: 'error',
          title: 'Error',
          text: 'Invalid email or password',
          toast: true,
          position: 'top-end', // Cambiar la posición aquí
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        }).fire();
        return;
      }

      const userData = {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        password: user.password,
        isAutenticated: true
      };

      login(userData);
      
      // Mostrar alerta de éxito al iniciar sesión correctamente
      await Swal.mixin({
        icon: 'success',
        title: 'Success',
        text: 'Logged in successfully',
        toast: true,
        position: 'top-end', // Cambiar la posición aquí
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      }).fire();

      navigate("/");
    } catch (error) {
      // Mostrar alerta de error si ocurre un error durante el inicio de sesión
      Swal.mixin({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during login',
        toast: true,
        position: 'top-end', // Cambiar la posición aquí
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      }).fire();
    } finally {
      setIsLoading(false);
    }
  }

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="formLogin shadow">
        <h1 className="text-center mb-4">Welcome</h1>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            value={emailUser} 
            onChange={email} 
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
              value={passwordUser} 
              onChange={password} 
              type={showPassword ? "text" : "password"} 
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password" 
              placeholder="••••••••"
              disabled={isLoading}
            />
            <button 
              className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
              type="button" 
              onClick={togglePasswordVisibility}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
        </div>
        <button 
          type="button" 
          onClick={ingresar} 
          className="btn btn-primary btn-lg w-100"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Loading...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </div>
    </div>
  );
}

export default CardLogin

import React, { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/Auth'
import usersCalls from '../services/usersCalls'
import Swal from 'sweetalert2'
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/CardLogin.css"



function CardLogin() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function fetchDataUsers() {
        const datos = await usersCalls.GetUsers();
        setUsers(datos)
    }

    fetchDataUsers();
}, []);

function email(event) {
    setEmailUser(event.target.value);
}

function password(event) {
    setPasswordUser(event.target.value);
}

function ingresar() {
    const user = users.find(user => user.email === emailUser && user.password === passwordUser);

    if (!user)  {
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'User not found!',
        });
        return;
    } 

    const userData = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      password: user.password,
      isAutenticated: true,
    }
    login(userData);

    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Ingresaste correctamente',
    }).then(() => {
      navigate("/");
    });

}

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="formLogin shadow">
        <h1 className="text-center mb-4">Bienvenido</h1>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              value={emailUser} 
              onChange={email} 
              type="email" 
              className="form-control form-control-lg" 
              id="email" 
              placeholder="nombre@ejemplo.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group input-group-lg">
              <input 
                value={passwordUser} 
                onChange={password} 
                type={showPassword ? "text" : "password"} 
                className="form-control" 
                id="password" 
                placeholder="••••••••"
              />
              <button 
                className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                type="button" 
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button 
            type="button" 
            onClick={ingresar} 
            className="btn btn-primary btn-lg w-100"
          >
            Iniciar Sesión
          </button>
      </div>
    </div>
  )
}

export default CardLogin

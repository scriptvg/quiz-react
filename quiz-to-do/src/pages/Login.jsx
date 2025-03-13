import React from 'react'
import CardLogin from '../components/CardLogin'
import Footer from '../components/ui/Footer'

// Función del componente Login
function Login() {
  return (
    <>
    <div>
      {/* Componente de tarjeta de inicio de sesión */}
      <CardLogin />
    </div>
    {/* Componente de pie de página */}
    <Footer />
    </>
  )
}

// Exportación del componente Login
export default Login

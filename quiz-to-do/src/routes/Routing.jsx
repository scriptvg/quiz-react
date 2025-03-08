import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import Register from '../pages/Register';

function Routing() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routing

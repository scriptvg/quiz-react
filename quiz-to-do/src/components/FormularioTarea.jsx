import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function FormularioTarea({ onAgregarTarea }) {
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: '',
    descripcion: '',
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevaTarea(prevTarea => ({
      ...prevTarea,
      [name]: value
    }));
  };

  const manejarEnvio = () => {
    if (!nuevaTarea.titulo) return; // Basic validation
    onAgregarTarea(nuevaTarea);
    setNuevaTarea({ titulo: '', descripcion: '' });
  };

  return (
    <div className="formulario-container">
      <div className="mb-3">
        <label className="form-label">Título de la Tarea</label>
        <input
          type="text"
          className="form-control"
          name="titulo"
          value={nuevaTarea.titulo}
          onChange={manejarCambio}
          placeholder="Ingresa el título de la tarea"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          name="descripcion"
          value={nuevaTarea.descripcion}
          onChange={manejarCambio}
          placeholder="Ingresa la descripción de la tarea"
          rows={3}
        />
      </div>

      <Button 
        variant="primary" 
        onClick={manejarEnvio}
      >
        Agregar Tarea
      </Button>
    </div>
  );
}

export default FormularioTarea;
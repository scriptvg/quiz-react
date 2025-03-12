import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { PlusCircle, Calendar, Flag, Type, AlignLeft, Save } from 'lucide-react';
import Swal from 'sweetalert2';
import "../styles/FormularioTarea.css";

function FormularioTarea({ onAgregarTarea, tareaEditando, onActualizarTarea }) {
  const mostrarAlerta = (icon, title) => {
    Swal.fire({
      icon,
      title,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  };

  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    prioridad: 'baja'
  });

  useEffect(() => {
    if (tareaEditando) {
      setNuevaTarea({
        titulo: tareaEditando.titulo || '',
        descripcion: tareaEditando.descripcion || '',
        fecha: tareaEditando.fecha || '',
        prioridad: tareaEditando.prioridad || 'baja',
        id: tareaEditando.id,
        completada: tareaEditando.completada
      });
    }
  }, [tareaEditando]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevaTarea(prevTarea => ({
      ...prevTarea,
      [name]: value
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!nuevaTarea.titulo.trim()) {
      mostrarAlerta('error', 'Por favor ingrese un título para la tarea');
      return;
    }
    
    // Si no hay fecha, usar la fecha y hora actual
    let fechaActual;
    if (!nuevaTarea.fecha) {
      const now = new Date();
      // Format date as YYYY-MM-DDThh:mm for datetime-local input
      fechaActual = now.toISOString().slice(0, 16);
    } else {
      fechaActual = nuevaTarea.fecha;
    }
    
    if (tareaEditando) {
      onActualizarTarea({
        ...nuevaTarea,
        fecha: fechaActual,
        id: tareaEditando.id
      });
      mostrarAlerta('success', 'Tarea actualizada correctamente');
    } else {
      onAgregarTarea({
        ...nuevaTarea,
        fecha: fechaActual,
        id: Date.now(),
        completada: false
      });
      mostrarAlerta('success', 'Tarea agregada correctamente');
    }
    
    setNuevaTarea({ 
      titulo: '', 
      descripcion: '', 
      fecha: '',
      prioridad: 'baja'
    });
  };

  const cancelarEdicion = () => {
    setNuevaTarea({ 
      titulo: '', 
      descripcion: '', 
      fecha: '',
      prioridad: 'baja'
    });
    onActualizarTarea(null);
    mostrarAlerta('info', 'Edición cancelada');
  };

  return (
    <div className="formulario-container border rounded shadow-sm">
      <h4 className="mb-3">{tareaEditando ? 'Editar Tarea' : 'Nueva Tarea'}</h4>
      
      <div className="mb-3">
        <label className="d-flex align-items-center">
          <Type size={18} className="me-2" />
          Título de la Tarea
        </label>
        <input
          type="text"
          name="titulo"
          value={nuevaTarea.titulo}
          onChange={manejarCambio}
          placeholder="Ingresa el título de la tarea"
          required
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="d-flex align-items-center">
          <AlignLeft size={18} className="me-2" />
          Descripción
        </label>
        <textarea
          name="descripcion"
          value={nuevaTarea.descripcion}
          onChange={manejarCambio}
          placeholder="Ingresa la descripción de la tarea"
          rows={3}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="d-flex align-items-center">
          <Calendar size={18} className="me-2" />
          Fecha y hora límite
        </label>
        <input
          type="datetime-local"
          name="fecha"
          value={nuevaTarea.fecha}
          onChange={manejarCambio}
          className="form-control"
        />
        <small className="text-muted">Si no selecciona fecha y hora, se usará la actual</small>
      </div>

      <div className="mb-4">
        <label className="d-flex align-items-center">
          <Flag size={18} className="me-2" />
          Prioridad
        </label>
        <select
          name="prioridad"
          value={nuevaTarea.prioridad}
          onChange={manejarCambio}
          className={`form-select prioridad-${nuevaTarea.prioridad}`}
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <Button 
        onClick={manejarEnvio}
        variant={tareaEditando ? "success" : "primary"}
        className="w-100 d-flex align-items-center justify-content-center gap-2"
      >
        {tareaEditando ? (
          <>
            <Save size={20} />
            Guardar Cambios
          </>
        ) : (
          <>
            <PlusCircle size={20} />
            Agregar Tarea
          </>
        )}
      </Button>
      
      {tareaEditando && (
        <Button 
          variant="outline-secondary" 
          className="w-100 mt-2"
          onClick={cancelarEdicion}
        >
          Cancelar Edición
        </Button>
      )}
    </div>
  );
}

export default FormularioTarea;
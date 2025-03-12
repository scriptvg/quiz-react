// Importación de dependencias y componentes necesarios
import React, { useState, useEffect } from 'react'
import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'
import FormularioTarea from '../components/formulariotarea'
import ListaTareas from '../components/listatareas'
import ContadorTareas from '../components/contadortareas'
import { useAuth } from '../services/Auth'
import taskCalls from '../services/taskCalls'
import { Container, Row, Col } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import Swal from 'sweetalert2'

// Componente principal de la página de inicio
function Inicio() {
  const { user } = useAuth();
  const [tareas, setTareas] = useState([]);
  const [tareaEditando, setTareaEditando] = useState(null);

  useEffect(() => {
    cargarTareas();
  }, []);

  const mostrarAlerta = (tipo, titulo, texto) => {
    Swal.mixin({
      icon: tipo,
      title: titulo,
      text: texto,
      customClass: {
        confirmButton: `btn btn-${tipo === 'error' ? 'danger' : 'success'}`
      },
      buttonsStyling: false
    });
  };

  const cargarTareas = async () => {
    try {
      const tareasUsuario = await taskCalls.obtenerTareas(user.id);
      setTareas(tareasUsuario);
    } catch (error) {
      mostrarAlerta('error', 'Error', 'Error al cargar las tareas');
    }
  };

  const agregarTarea = async (nuevaTarea) => {
    try {
      await taskCalls.crearTarea(
        nuevaTarea.titulo,
        nuevaTarea.descripcion,
        false,
        user.id,
        nuevaTarea.fecha,
        nuevaTarea.prioridad
      );
      await cargarTareas();
      mostrarAlerta('success', 'Éxito', 'Tarea creada correctamente');
    } catch (error) {
      mostrarAlerta('error', 'Error', 'Error al crear la tarea');
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await taskCalls.eliminarTarea(id, user.id);
      await cargarTareas();
      mostrarAlerta('success', 'Éxito', 'Tarea eliminada correctamente');
    } catch (error) {
      mostrarAlerta('error', 'Error', 'Error al eliminar la tarea');
    }
  };

  const completarTarea = async (id) => {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
      try {
        await taskCalls.actualizarTarea(
          tarea.titulo,
          tarea.descripcion,
          !tarea.completada,
          id,
          user.id
        );
        await cargarTareas();
      } catch (error) {
        mostrarAlerta('error', 'Error', 'Error al actualizar la tarea');
      }
    }
  };

  const editarTarea = (tarea) => {
    setTareaEditando(tarea);
  };

  const actualizarTarea = async (tareaActualizada) => {
    try {
      await taskCalls.actualizarTarea(
        tareaActualizada.titulo,
        tareaActualizada.descripcion,
        tareaActualizada.completada,
        tareaActualizada.id,
        user.id,
        tareaActualizada.fecha,
        tareaActualizada.prioridad
      );
      setTareaEditando(null);
      await cargarTareas();
      mostrarAlerta('success', 'Éxito', 'Tarea actualizada correctamente');
    } catch (error) {
      mostrarAlerta('error', 'Error', 'Error al actualizar la tarea');
    }
  };

  return (
    <>
      <NavBar />
      <Container className="mt-5 mb-5">
        <Row>
          <Col md={5}>
            <FormularioTarea 
              onAgregarTarea={agregarTarea} 
              tareaEditando={tareaEditando}
              onActualizarTarea={actualizarTarea}
            />
          </Col>
          <Col md={7}>
            <ContadorTareas tareas={tareas} />
            <ListaTareas 
              tareas={tareas} 
              onEliminarTarea={eliminarTarea}
              onCompletarTarea={completarTarea}
              onEditarTarea={editarTarea}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Inicio;
// Importación de dependencias y componentes necesarios
import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '../components/ui/NavBar';
import Footer from '../components/ui/Footer';
import ListaTareas from '../components/ListaTareas';
import FormularioTarea from '../components/FormularioTarea';
import ContadorTareas from '../components/contadortareas';
import { useAuth } from '../services/Auth';
import taskCalls from '../services/taskCalls';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';
import "../styles/Inicio.css";

// Componente principal de la página de inicio
function Inicio() {
    const { user } = useAuth(); // Obtener el usuario autenticado
    const [tareas, setTareas] = useState([]); // Estado para almacenar las tareas
    const [tareaEditando, setTareaEditando] = useState(null); // Estado para la tarea que se está editando
    const [isLoading, setIsLoading] = useState(false); // Estado para el indicador de carga
    const [error, setError] = useState(null); // Estado para manejar errores

    // Efecto para cargar las tareas cuando el usuario cambia
    useEffect(() => {
        let isMounted = true;

        if (user?.id) {
            cargarTareas(isMounted);
        }

        return () => {
            isMounted = false;
        };
    }, [user]);

    // Función para mostrar alertas
    const mostrarAlerta = (tipo, titulo, texto, showConfirmButton = false) => {
        Swal.mixin({
            toast: true,
            icon: tipo,
            title: titulo,
            text: texto,
            position: 'top-end', // Change the position here
            showConfirmButton,
            timer: showConfirmButton ? undefined : 3000,
            timerProgressBar: !showConfirmButton,
            customClass: {
                confirmButton: `btn btn-${tipo === 'error' ? 'danger' : 'success'}`
            },
            buttonsStyling: false
        }).fire();
    };

    // Función para cargar las tareas del usuario
    const cargarTareas = useCallback(async (isMounted = true) => {
        if (!user?.id) return;

        setIsLoading(true);
        setError(null);

        try {
            const tareasUsuario = await taskCalls.obtenerTareas(user.id);
            if (isMounted) {
                setTareas(tareasUsuario || []);
            }
        } catch (error) {
            console.error('Error al cargar tareas:', error);
            if (isMounted) {
                setError('Error al cargar las tareas');
                mostrarAlerta('error', 'Error', 'Error al cargar las tareas');
            }
        } finally {
            if (isMounted) {
                setIsLoading(false);
            }
        }
    }, [user]);

    // Función para agregar una nueva tarea
    const agregarTarea = async (nuevaTarea) => {
        if (!user?.id) return;
        try {
            await taskCalls.crearTarea(
                nuevaTarea.titulo,
                nuevaTarea.descripcion,
                false,
                user.id,
                nuevaTarea.fecha,
                nuevaTarea.prioridad,
                nuevaTarea.categories
            );
            await cargarTareas();
            mostrarAlerta('success', 'Éxito', 'Tarea creada correctamente');
        } catch (error) {
            console.error('Error al crear tarea:', error);
            mostrarAlerta('error', 'Error', 'Error al crear la tarea');
        }
    };

    // Función para eliminar una tarea
    const eliminarTarea = async (id) => {
        if (!user?.id || !id) return;
        try {
            await taskCalls.eliminarTarea(id, user.id);
            await cargarTareas();
            mostrarAlerta('success', 'Éxito', 'Tarea eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
            mostrarAlerta('error', 'Error', 'Error al eliminar la tarea');
        }
    };

    // Función para completar una tarea
    const completarTarea = async (id) => {
        if (!user?.id || !id) return;
        const tarea = tareas.find(t => t.id === id);
        if (tarea) {
            try {
                await taskCalls.actualizarTarea(
                    tarea.titulo,
                    tarea.descripcion,
                    !tarea.completada,
                    id,
                    user.id,
                    tarea.fecha,
                    tarea.prioridad,
                    tarea.categories
                );
                await cargarTareas();
            } catch (error) {
                console.error('Error al completar tarea:', error);
                mostrarAlerta('error', 'Error', 'Error al actualizar la tarea');
            }
        }
    };

    // Función para editar una tarea
    const editarTarea = (tarea) => {
        if (tarea) {
            setTareaEditando(tarea);
        }
    };

    // Función para actualizar una tarea
    const actualizarTarea = async (tareaActualizada) => {
        if (!user?.id || !tareaActualizada?.id) return;
        try {
            await taskCalls.actualizarTarea(
                tareaActualizada.titulo,
                tareaActualizada.descripcion,
                tareaActualizada.completada,
                tareaActualizada.id,
                user.id,
                tareaActualizada.fecha,
                tareaActualizada.prioridad,
                tareaActualizada.categories
            );
            setTareaEditando(null);
            await cargarTareas();
            mostrarAlerta('success', 'Éxito', 'Tarea actualizada correctamente', true);
        } catch (error) {
            console.error('Error al actualizar tarea:', error);
            mostrarAlerta('error', 'Error', 'Error al actualizar la tarea', true);
        }
    };

    return (
        <>
            <NavBar />
            <Container className="mt-5 mb-5">
                {user && (
                    <div className="welcome-message text-center mb-4">
                        <h2>¡Bienvenido, {user.nombre}!</h2>
                        <p className="text-muted">Gestiona tus tareas de manera eficiente</p>
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <Row>
                    <Col md={5}>
                        <FormularioTarea 
                            onAgregarTarea={agregarTarea} 
                            tareaEditando={tareaEditando}
                            onActualizarTarea={actualizarTarea}
                            disabled={isLoading}
                        />
                    </Col>
                    <Col className='container' md={7}>
                        <ContadorTareas tareas={tareas} />
                        {isLoading ? (
                            <div className="text-center p-4">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <ListaTareas 
                                tareas={tareas} 
                                onEliminarTarea={eliminarTarea}
                                onCompletarTarea={completarTarea}
                                onEditarTarea={editarTarea}
                            />
                        )}
                    </Col>
                </Row>

            </Container>
            <Footer />
        </>
    );
}

export default Inicio;

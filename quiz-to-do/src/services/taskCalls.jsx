// Obtener todas las tareas
async function obtenerTareas(idUsuario) {
    try {
        const respuesta = await fetch(`http://localhost:3001/tareas?userId=${idUsuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error('Error al obtener las tareas');
        }

        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        throw error;
    }
}

// Crear nueva tarea
async function crearTarea(titulo, descripcion, completada, idUsuario, fecha, prioridad) {
    try {
        const datosTarea = { 
            titulo, 
            descripcion, 
            completada, 
            idUsuario,
            fecha,
            prioridad
        };

        const respuesta = await fetch("http://localhost:3001/tareas", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosTarea)
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear la tarea');
        }

        return await respuesta.json();
    } catch (error) {
        console.error('Error al crear tarea:', error);
        throw error;
    }
}

// Actualizar tarea existente
async function actualizarTarea(titulo, descripcion, completada, id, idUsuario, fecha, prioridad) {
    try {
        const datosTarea = { 
            titulo, 
            descripcion, 
            completada, 
            id, 
            idUsuario,
            fecha,
            prioridad
        };

        const respuesta = await fetch(`http://localhost:3001/tareas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosTarea)
        });

        if (!respuesta.ok) {
            throw new Error(`Error al actualizar la tarea con id ${id}`);
        }

        return await respuesta.json();
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        throw error;
    }
}

// Eliminar tarea
async function eliminarTarea(id, idUsuario) {
    try {
        const respuesta = await fetch(`http://localhost:3001/tareas/${id}?userId=${idUsuario}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al eliminar la tarea con id ${id}`);
        }

        return { mensaje: `Tarea con id ${id} eliminada correctamente` };
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        throw error;
    }
}

export default { 
    obtenerTareas, 
    crearTarea, 
    actualizarTarea, 
    eliminarTarea 
};

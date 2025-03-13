// Importación de dependencias necesarias
import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Stack } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle, Trash2, Clock, AlertTriangle, Edit, Tag } from 'lucide-react';
import '../styles/ListaTareas.css';

// Componente principal que muestra la lista de tareas
function ListaTareas({ tareas, onEliminarTarea, onCompletarTarea, onEditarTarea }) {
  // Estado para almacenar las categorías
  const [categories, setCategories] = useState([]);

  // Efecto para cargar las categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/categories');
        if (!response.ok) throw new Error('Error al cargar categorías');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCategories();
  }, []);

  // Función para determinar el color del badge según la prioridad
  const getPriorityBadgeColor = (prioridad) => {
    if (!prioridad) return 'secondary';
    const priority = prioridad.toLowerCase();
    switch(priority) {
      case 'alta': return 'danger';
      case 'media': return 'warning';
      case 'baja': return 'info';
      default: return 'secondary';
    }
  };

  // Función para formatear la fecha y hora
  const formatearFechaHora = (fechaString) => {
    if (!fechaString) return 'Sin fecha';
    
    try {
      const fecha = parseISO(fechaString);
      return format(fecha, "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es });
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return fechaString;
    }
  };

  // Función para verificar si una fecha está vencida
  const esFechaVencida = (fechaString) => {
    if (!fechaString) return false;
    
    try {
      const fecha = parseISO(fechaString);
      return fecha < new Date();
    } catch (error) {
      return false;
    }
  };

  // Renderizado del componente
  return (
    <div className="lista-tareas">
      {tareas.length === 0 ? (
        // Mensaje cuando no hay tareas
        <div className="text-center p-4 bg-light rounded">
          <p className="mb-0">No hay tareas pendientes</p>
        </div>
        
      ) : (
        // Lista de tareas
        <Stack gap={3}>
          {tareas.map((tarea) => (
            <Card 
              key={tarea.id} 
              className={`shadow-sm ${tarea.completada ? 'border-success' : 'border-start border-4'}`}
              style={{ 
                borderLeftColor: tarea.completada ? '' : 
                  tarea.prioridad === 'alta' ? '#dc3545' : 
                  tarea.prioridad === 'media' ? '#ffc107' : '#0dcaf0' 
              }}
            >
              <Card.Body>
                {/* Encabezado de la tarea con título y badges */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className={tarea.completada ? 'text-decoration-line-through text-muted' : ''}>
                    {tarea.titulo}
                  </h5>
                  <div className="d-flex gap-2 align-items-center">
                    {/* Badges de categorías */}
                    {tarea.categories?.map(categoryId => {
                      const category = categories.find(c => c.id === categoryId);
                      return category ? (
                        <Badge
                          key={category.id}
                          style={{
                            backgroundColor: category.color,
                            color: '#fff'
                          }}
                          className="d-flex align-items-center"
                        >
                          <Tag size={12} className="me-1" />
                          {category.name}
                        </Badge>
                      ) : null;
                    })}
                    {/* Badge de prioridad */}
                    <Badge bg={getPriorityBadgeColor(tarea.prioridad)}>
                      {tarea.prioridad ? tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1) : 'Baja'}
                    </Badge>
                  </div>
                </div>
                
                <hr className="my-3 opacity-25" />
                {/* Descripción de la tarea */}
                {tarea.descripcion && (
                  <Card.Text className={tarea.completada ? 'text-decoration-line-through text-muted' : ''}>
                    {tarea.descripcion}
                  </Card.Text>
                )}
                
                {/* Fecha de la tarea */}
                {tarea.fecha && (
                  <div className="mb-3">
                    <span 
                      className={`date-chip ${esFechaVencida(tarea.fecha) && !tarea.completada ? 'date-chip-overdue' : ''} ${tarea.completada ? 'date-chip-completed' : ''}`}
                    >
                      {esFechaVencida(tarea.fecha) && !tarea.completada ? (
                        <AlertTriangle size={14} className="me-1" />
                      ) : (
                        <Clock size={14} className="me-1" />
                      )}
                      {formatearFechaHora(tarea.fecha)}
                    </span>
                  </div>
                )}
                
                {/* Botones de acción */}
                <div className="d-flex gap-2 mt-3">
                  <Button
                    variant={tarea.completada ? "success" : "outline-success"}
                    onClick={() => onCompletarTarea(tarea.id)}
                    className="d-flex align-items-center"
                    size="sm"
                  >
                    <CheckCircle size={16} className="me-2" />
                    {tarea.completada ? "Completada" : "Marcar como completada"}
                  </Button>
                  
                  <Button
                    variant="outline-primary"
                    onClick={() => onEditarTarea(tarea)}
                    className="d-flex align-items-center"
                    size="sm"
                  >
                    <Edit size={16} className="me-2" />
                    Editar
                  </Button>
                  
                  <Button
                    variant="outline-danger"
                    onClick={() => onEliminarTarea(tarea.id)}
                    className="d-flex align-items-center"
                    size="sm"
                  >
                    <Trash2 size={16} className="me-2" />
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Stack>
      )}
    </div>
  );
}

export default ListaTareas;
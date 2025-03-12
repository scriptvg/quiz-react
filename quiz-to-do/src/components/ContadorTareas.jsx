// Importamos las dependencias necesarias
import React from 'react';
import { CheckCircle } from 'lucide-react';
import '../styles/ContadorTareas.css';

// Componente que muestra el contador de tareas y la barra de progreso
function ContadorTareas({ tareas }) {
  // Calculamos el número de tareas completadas filtrando el array de tareas
  const tareasCompletadas = tareas.filter(tarea => tarea.completada).length;
  // Obtenemos el total de tareas
  const totalTareas = tareas.length;
  
  // Calcular el porcentaje de tareas completadas
  const porcentajeCompletado = totalTareas > 0 
    ? Math.round((tareasCompletadas / totalTareas) * 100) 
    : 0;

  return (
    // Contenedor principal del contador
    <div className="contador-container">
      {/* Chip que muestra el contador de tareas */}
      <div className="contador-chip">
        <CheckCircle size={18} className="me-2" />
        {/* Texto que muestra el progreso de las tareas */}
        <span className="contador-texto">
          {tareasCompletadas} de {totalTareas} tareas completadas ({porcentajeCompletado}%)
        </span>
      </div>
      
      {/* Barra de progreso */}
      <div className="progress mt-2" style={{ height: '8px' }}>
        {/* Barra interna que muestra el progreso actual */}
        <div 
          className="progress-bar bg-success" 
          role="progressbar" 
          style={{ width: `${porcentajeCompletado}%` }} 
          aria-valuenow={porcentajeCompletado} 
          aria-valuemin="0" 
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
}

// Exportamos el componente para usarlo en otras partes de la aplicación
export default ContadorTareas;
import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ListaTareas({ tareas, onEliminarTarea, onCompletarTarea }) {
  return (
    <div className="lista-tareas">
      {tareas.map((tarea) => (
        <Card key={tarea.id} className="mb-3">
          <Card.Body>
            <Card.Title className={tarea.completada ? 'text-muted' : ''}>
              {tarea.titulo}
            </Card.Title>
            <Card.Text>{tarea.descripcion}</Card.Text>
            <div className="d-flex gap-2">
              <Button
                variant={tarea.completada ? "success" : "outline-success"}
                onClick={() => onCompletarTarea(tarea.id)}
              >
                {tarea.completada ? "Completada" : "Marcar como completada"}
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => onEliminarTarea(tarea.id)}
              >
                Eliminar
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ListaTareas;
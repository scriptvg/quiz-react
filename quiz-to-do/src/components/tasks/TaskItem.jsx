import React from 'react';
import { GripVertical, Trash2, CheckCircle, Circle, Calendar, Flag, Clock } from 'lucide-react';
import { Card, Button, Badge } from 'react-bootstrap';
import { format, formatDistanceToNow, isToday, isTomorrow } from 'date-fns';

function TaskItem({ task, onComplete, onDelete }) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  const getFormattedDate = (date) => {
    try {
      if (!date) return '';
      const dateObj = new Date(date);
      if (isToday(dateObj)) return 'Today';
      if (isTomorrow(dateObj)) return 'Tomorrow';
      return format(dateObj, 'MMM dd, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return date;
    }
  };

  const getFormattedTime = (date) => {
    try {
      if (!date) return '';
      return format(new Date(date), 'HH:mm');
    } catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'success',
      medium: 'warning',
      high: 'danger'
    };
    return colors[priority] || 'secondary';
  };

  return (
    <Card 
      className={`mb-3 border-0 shadow-sm task-card ${task.completed ? 'completed-task' : ''}`} 
      data-task-id={task.id}
    >
      <Card.Body className="p-4">
        <div className="d-flex flex-column">
          <div className="d-flex align-items-start mb-3">
            <div className="me-3 cursor-move">
              <GripVertical size={24} className="text-muted" />
            </div>
            <div className="flex-grow-1">
              <h5 className="mb-2">
                {task.title}
              </h5>
              {task.description && (
                <p className="mb-3 text-secondary">
                  {task.description}
                </p>
              )}
              <div className="d-flex flex-wrap gap-2 mt-2">
                {task.dueDate && (
                  <Badge 
                    bg={isOverdue ? 'danger' : isToday(new Date(task.dueDate)) ? 'warning' : 'info'} 
                    className="task-badge"
                  >
                    {isOverdue ? <Clock size={14} /> : <Calendar size={14} />}
                    <span className="ms-1">{getFormattedDate(task.dueDate)}</span>
                  </Badge>
                )}
                {task.priority && (
                  <Badge 
                    bg={getPriorityColor(task.priority)} 
                    className="task-badge"
                  >
                    <Flag size={14} />
                    <span className="ms-1">{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                  </Badge>
                )}
                {task.createdAt && (
                  <Badge 
                    bg="secondary" 
                    className="task-badge"
                  >
                    <Clock size={14} />
                    <span className="ms-1">Created {formatDistanceToNow(new Date(task.createdAt))} ago</span>
                  </Badge>
                )}
              </div>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="link"
                className={`p-2 ${task.completed ? 'text-success' : 'text-warning'}`}
                onClick={() => onComplete(task)}
              >
                {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
              </Button>
              <Button
                variant="link"
                className="text-danger p-2"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 size={24} />
              </Button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TaskItem;
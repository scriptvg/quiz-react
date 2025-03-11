import React, { useState } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Plus, Type, AlignLeft, Calendar, Flag } from 'lucide-react';
import { format } from 'date-fns';

function TaskForm({ onSubmit }) {
  const currentDate = new Date();
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: format(currentDate, 'yyyy-MM-dd'),
    priority: 'medium',
    createdAt: currentDate.toISOString(),
    completed: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionDate = new Date();
    onSubmit({
      ...newTask,
      id: Date.now(),
      createdAt: submissionDate.toISOString(),
      dueDate: newTask.dueDate || format(submissionDate, 'yyyy-MM-dd')
    });
    
    // Reset form
    setNewTask({
      title: '',
      description: '',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      priority: 'medium',
      createdAt: new Date().toISOString(),
      completed: false
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="g-2">
        <Col md={3}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <Type size={18} className="text-primary" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              required
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <Calendar size={18} className="text-primary" />
            </InputGroup.Text>
            <Form.Control
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <Flag size={18} className="text-primary" />
            </InputGroup.Text>
            <Form.Select
              value={newTask.priority}
              onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Form.Select>
          </InputGroup>
        </Col>
        <Col md={3}>
          <Button 
            type="submit" 
            variant="primary"
            className="w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <Plus size={18} />
            Add Task
          </Button>
        </Col>
        <Col md={12}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <AlignLeft size={18} className="text-primary" />
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Add description..."
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            />
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
}

export default TaskForm;
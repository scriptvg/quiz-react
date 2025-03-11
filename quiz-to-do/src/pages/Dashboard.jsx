import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/Auth';
import NavBar from '../components/ui/NavBar';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { BookOpen, ListTodo, Loader2, CheckSquare } from 'lucide-react';
import Swal from 'sweetalert2';
import taskCalls from '../services/taskCalls';
import '../styles/dashboard.css';
import Footer from '../components/ui/Footer';
import TaskStats from '../components/dashboard/TaskStats';

function Dashboard() {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [tasks, setTasks] = useState([]); // Add tasks state

  // Add useEffect to fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userTasks = await taskCalls.GetTasks();
        const filteredTasks = userTasks.filter(task => task.userId === user.id);
        setTasks(filteredTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load tasks'
        });
      }
    };

    fetchTasks();
  }, [user.id, refreshKey]);

  const handleAddTask = async (newTask) => {
    try {
      await taskCalls.PostTask(
        newTask.title,
        newTask.description,
        false,
        user.id,
        newTask.dueDate,
        newTask.priority,
        new Date().toISOString()
      );
      
      setRefreshKey(prevKey => prevKey + 1); // This will trigger a re-fetch of tasks

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Task added successfully',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add task'
      });
    }
};
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="container-fluid min-vh-100 d-flex flex-column">
        <NavBar />
        <Container fluid className="py-5 flex-grow-1">
          <Row className="mb-5 justify-content-center">
            <Col lg={10} className="mx-auto">
              <div className="d-flex align-items-center gap-3 welcome-section bg-white p-4 rounded-3 shadow-sm">
                <BookOpen size={40} className="text-primary" />
                <div>
                  <h1 className="mb-1 fw-bold display-6">¡Bienvenido de nuevo, {user.nombre}!</h1>
                  <p className="text-muted mb-0 lead">Gestiona tus tareas de manera eficiente</p>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={10} className="mx-auto">
              <TaskStats tasks={tasks} /> {/* Now tasks will be defined */}
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={10} className="mx-auto">
              <Card className="border-0 shadow-sm task-form-card">
                <Card.Body className="p-4">
                  <TaskForm onSubmit={handleAddTask} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="g-4 justify-content-center">
            <Col lg={4} md={12} className="task-list-column">
              <Card className="shadow-sm h-100 border-0 hover-shadow">
                <Card.Header className="bg-primary bg-gradient text-white py-3">
                  <h5 className="mb-0 d-flex align-items-center">
                    <ListTodo size={20} className="me-2" />
                    Pendientes
                  </h5>
                </Card.Header>
                <Card.Body className="bg-white rounded-bottom">
                  <TaskList status="todo" key={`todo-${refreshKey}`} />
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={4}>
              <Card className="shadow-sm h-100 border-0 hover-shadow">
                <Card.Header className="bg-warning bg-gradient text-dark py-3">
                  <h5 className="mb-0 d-flex align-items-center">
                    <Loader2 size={20} className="me-2" />
                    En Progreso
                  </h5>
                </Card.Header>
                <Card.Body className="bg-white rounded-bottom p-3">
                  <TaskList status="inProgress" key={`inProgress-${refreshKey}`} />
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={4}>
              <Card className="shadow-sm h-100 border-0 hover-shadow">
                <Card.Header className="bg-success bg-gradient text-white py-3">
                  <h5 className="mb-0 d-flex align-items-center">
                    <CheckSquare size={20} className="me-2" />
                    Completadas
                  </h5>
                </Card.Header>
                <Card.Body className="bg-white rounded-bottom p-3">
                  <TaskList status="completed" key={`completed-${refreshKey}`} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;

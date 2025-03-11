// Importación de dependencias necesarias
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { UserCircle, Mail, Key, Shield, Calendar, Activity } from 'lucide-react';
import { useAuth } from '../services/Auth';
import NavBar from '../components/ui/NavBar';
import usersCalls from '../services/usersCalls';
import Swal from 'sweetalert2';
import useForm from '../hooks/useForm';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

// Componente principal de perfil de usuario
function Profile() {
  // Obtención de datos del usuario y función de login del contexto de autenticación
  const { user, login } = useAuth();
  // Estado para controlar si el usuario está editando su perfil
  const [isEditing, setIsEditing] = useState(false);

  // Esquema de validación para el formulario
  const validationSchema = {
    nombre: {
      required: true,
      minLength: 2,
      message: 'El nombre debe tener al menos 2 caracteres'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Por favor ingrese un email válido'
    },
    password: {
      required: true,
      message: 'La contraseña actual es requerida'
    },
    newPassword: {
      minLength: 6,
      validate: (value, values) => {
        if (value && value === values.password) {
          return 'La nueva contraseña debe ser diferente a la actual';
        }
        return '';
      }
    },
    confirmPassword: {
      validate: (value, values) => {
        if (values.newPassword && value !== values.newPassword) {
          return 'Las contraseñas no coinciden';
        }
        return '';
      }
    }
  };

  // Uso del hook personalizado para manejo de formularios
  const {
    values: formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue
  } = useForm({
    nombre: user?.nombre || '',
    email: user?.email || '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  }, validationSchema);

  // Función para manejar el envío del formulario
  const onSubmit = async (values) => {
    try {
      // Obtener usuarios y verificar contraseña actual
      const users = await usersCalls.GetUsers();
      const currentUser = users.find(u => u.id === user.id && u.password === values.password);

      if (!currentUser) {
        throw new Error('La contraseña actual es incorrecta');
      }

      // Preparar datos actualizados del usuario
      const updatedUser = {
        ...currentUser,
        nombre: values.nombre,
        email: values.email,
        password: values.newPassword || values.password
      };

      // Actualizar usuario en la base de datos y en el contexto
      await usersCalls.UpdateUsers(updatedUser);
      login(updatedUser);

      // Mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Perfil actualizado',
        text: 'Los cambios se han guardado correctamente',
        showConfirmButton: false,
        timer: 1500
      });

      // Resetear estado del formulario
      setIsEditing(false);
      resetForm();
    } catch (error) {
      // Mostrar mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo actualizar el perfil'
      });
    }
  };

  // Función para cancelar la edición
  const handleCancel = () => {
    setIsEditing(false);
    resetForm();
  };

  // Renderizado del componente
  return (
    <div className="min-vh-100 bg-light">
      <NavBar />
      <Container className="py-5">
        {/* Contenedor principal con animación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Row className="justify-content-center">
            <Col lg={8}>
              {/* Tarjeta de perfil */}
              <Card className="shadow-lg border-0 overflow-hidden">
                {/* Encabezado de la tarjeta */}
                <Card.Header className="bg-primary bg-gradient text-white py-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="d-flex align-items-center gap-3"
                  >
                    <div className="bg-white rounded-circle p-2 shadow-sm">
                      <UserCircle size={40} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="mb-0 fw-bold">Perfil de Usuario</h4>
                      <small className="opacity-75">Gestiona tu información personal</small>
                    </div>
                  </motion.div>
                </Card.Header>

                {/* Cuerpo de la tarjeta */}
                <Card.Body className="p-4">
                  {/* Mensajes de error animados */}
                  <AnimatePresence>
                    {Object.keys(errors).map(key => errors[key] && (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Alert variant="danger" className="d-flex align-items-center gap-2">
                          <Shield size={20} className="flex-shrink-0" />
                          {errors[key]}
                        </Alert>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Información del usuario */}
                  <Row className="mb-4">
                    <Col md={6}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-3 bg-white rounded-3 shadow-sm"
                      >
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <Calendar size={20} className="text-primary" />
                          <small className="text-muted">Miembro desde</small>
                        </div>
                        <p className="mb-0 fw-bold">{new Date().toLocaleDateString()}</p>
                      </motion.div>
                    </Col>
                    <Col md={6}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-3 bg-white rounded-3 shadow-sm"
                      >
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <Activity size={20} className="text-primary" />
                          <small className="text-muted">Estado</small>
                        </div>
                        <p className="mb-0 fw-bold text-success">Activo</p>
                      </motion.div>
                    </Col>
                  </Row>

                  {/* Formulario de perfil */}
                  <Form onSubmit={handleSubmit(onSubmit)} className="profile-form">
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Ingrese su nombre completo</Tooltip>}
                    >
                      <Form.Group className="mb-4">
                        <Form.Label className="d-flex align-items-center gap-2">
                          <UserCircle size={20} />
                          Nombre
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          disabled={!isEditing}
                          isInvalid={!!errors.nombre}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.nombre}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </OverlayTrigger>

                    {/* Botones de acción */}
                    <motion.div 
                      className="d-flex gap-3 mt-4"
                      initial={false}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {!isEditing ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-primary px-4 py-2 d-flex align-items-center gap-2"
                          onClick={() => setIsEditing(true)}
                        >
                          <UserCircle size={20} />
                          Editar Perfil
                        </motion.button>
                      ) : (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="btn btn-primary px-4 py-2 d-flex align-items-center gap-2"
                          >
                            <Shield size={20} />
                            Guardar Cambios
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-outline-secondary px-4 py-2"
                            onClick={handleCancel}
                          >
                            Cancelar
                          </motion.button>
                        </>
                      )}
                    </motion.div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </div>
  );
}

export default Profile;
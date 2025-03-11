// Importamos React y los componentes necesarios de react-bootstrap
import React from 'react';
import { Alert, Button } from 'react-bootstrap';

// Clase que maneja los errores en la aplicación
class ErrorBoundary extends React.Component {
  // Constructor que inicializa el estado
  constructor(props) {
    super(props);
    // Estado inicial: no hay errores
    this.state = { hasError: false };
  }

  // Método estático que actualiza el estado cuando ocurre un error
  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar la UI de error
    return { hasError: true };
  }

  // Método que renderiza el componente
  render() {
    // Si hay un error, muestra el mensaje de error
    if (this.state.hasError) {
      return (
        <Alert variant="danger" className="m-4">
          <Alert.Heading>Oops! Something went wrong</Alert.Heading>
          <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
          <Button 
            variant="outline-danger" 
            // Función que recarga la página cuando se hace clic en el botón
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </Alert>
      );
    }

    // Si no hay error, renderiza los componentes hijos normalmente
    return this.props.children;
  }
}

// Exportamos el componente para usarlo en otras partes de la aplicación
export default ErrorBoundary;
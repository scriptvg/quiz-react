// Import styles and required components/providers
import './App.css'
import Routing from './routes/routing'
import { TaskProvider } from './contexts/TaskContext';
import { AuthProvider } from './services/Auth';
import { ThemeProvider } from './contexts/ThemeContext';

/**
 * Root component of the application
 * Wraps the entire app with necessary context providers:
 * - AuthProvider: Manages authentication state
 * - ThemeProvider: Manages application theme
 * - TaskProvider: Manages tasks state and operations
 */
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TaskProvider>
          <>
            <div>
             <Routing/>   
            </div>
          </>
        </TaskProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

// Import necessary React dependencies and components
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * Entry point of the React application
 * Creates a root element and renders the App component within StrictMode
 * StrictMode enables additional development checks and warnings
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

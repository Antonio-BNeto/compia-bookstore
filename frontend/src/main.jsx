import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeDatabase } from './services/mockApi.js';
import App from './App.jsx';
import './index.css';

initializeDatabase();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

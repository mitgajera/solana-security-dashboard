import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// Get the root element
const container = document.getElementById('root');

// Ensure container exists
if (!container) {
  throw new Error('Root element not found!');
}

// Create a root
const root = createRoot(container);

// Render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
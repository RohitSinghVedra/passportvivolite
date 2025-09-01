import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Immediately check if this is a certificate route and prepare the DOM
const path = window.location.pathname;
if (path.startsWith('/certificate/')) {
  // Clear any certificate loading screen that was added by the HTML script
  const root = document.getElementById('root');
  if (root && root.querySelector('.certificate-loading')) {
    root.innerHTML = '';
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

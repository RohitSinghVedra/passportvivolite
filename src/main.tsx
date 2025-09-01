import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Immediately check if this is a certificate route and prepare the DOM
const path = window.location.pathname;
if (path.startsWith('/certificate/')) {
  // Remove any certificate loading screen that was added by the HTML script
  const certificateLoading = document.querySelector('.certificate-loading');
  if (certificateLoading) {
    certificateLoading.remove();
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './patchbay/base.css'
import './patchbay/system.css'
import './patchbay/interior.css'
import './patchbay/motion.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)

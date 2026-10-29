import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './build-room.css'
import './build-motion.css'
import './reader.css'
import './editorial-motion.css'
import './final-polish.css'
import './footer-revision.css'
import './sound-and-creatures.css'
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

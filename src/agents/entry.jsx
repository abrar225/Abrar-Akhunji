import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import Showcase from './Showcase';
import '../patchbay/base.css'
import '../patchbay/system.css'
const root = document.getElementById('agents-root');
if (root.querySelector('main')) hydrateRoot(root, <Showcase/>);
else createRoot(root).render(<Showcase/>);

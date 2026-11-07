import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import React from 'react';
import fs from 'node:fs/promises';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true } });
try {
  const { default: Showcase } = await server.ssrLoadModule('/src/agents/Showcase.jsx');
  const file = new URL('../dist/agents-at-work/index.html', import.meta.url);
  const html = await fs.readFile(file, 'utf8');
  await fs.writeFile(file, html.replace('<!--prerender-->', renderToString(React.createElement(Showcase))));
} finally { await server.close(); }

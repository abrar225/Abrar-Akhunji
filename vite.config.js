import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Vite plugin to serve Vercel API routes locally
const vercelApiMock = (mode) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    name: 'vercel-api-mock',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Match /api/generate and /api/chat routes
        const isGenerate = req.url === '/api/generate' && req.method === 'POST';
        const isChat = req.url === '/api/chat' && req.method === 'POST';

        if (isGenerate || isChat) {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', async () => {
            try {
              req.body = JSON.parse(body);
              
              // Mock res.status().json()
              res.status = (code) => {
                res.statusCode = code;
                return res;
              };
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              };

              // Pass env vars to handler
              if (env.OPENROUTER_API_KEY) {
                process.env.OPENROUTER_API_KEY = env.OPENROUTER_API_KEY;
              }
              if (env.VITE_OPENROUTER_API_KEY) {
                process.env.VITE_OPENROUTER_API_KEY = env.VITE_OPENROUTER_API_KEY;
              }

              // Route to the correct handler
              const handlerFile = isGenerate ? 'generate.js' : 'chat.js';
              const handlerPath = path.join(__dirname, 'api', handlerFile) + '?update=' + Date.now();
              const apiHandler = await import(handlerPath);
              await apiHandler.default(req, res);
            } catch (err) {
              console.error('API Mock Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Internal Server Error', details: err.message }));
            }
          });
          return;
        }
        next();
      });
    }
  };
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      vercelApiMock(mode)
    ],
  };
})

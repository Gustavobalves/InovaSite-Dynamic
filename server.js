import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');
const indexFile = path.join(distDir, 'index.html');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.disable('x-powered-by');
app.use(express.static(distDir));

// SPA fallback: serve dist/index.html for all non-asset GET/HEAD requests
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return next();
  }
  if (!fs.existsSync(indexFile)) {
    return res
      .status(503)
      .send('Build não encontrado (dist/index.html ausente). Execute "npm run build" antes de iniciar o servidor.');
  }
  res.sendFile(indexFile);
});

app.listen(port, '0.0.0.0', () => {
  if (!fs.existsSync(indexFile)) {
    console.warn(`[server.js] Aviso: ${indexFile} não encontrado. Configure o comando de compilação como "npm run build".`);
  }
  console.log(`Server listening on port ${port} (serving ${distDir})`);
});

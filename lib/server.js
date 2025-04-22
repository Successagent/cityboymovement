require('dotenv').config(); // Load environment variables from .env

const { createServer } = require('http');
const next = require('next');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    // Passenger passes control via 'start' request
    if (req.url === '/start' && req.method === 'GET') {
      res.writeHead(200);
      res.end('ok');
      return;
    }

    handle(req, res);
  });

  server.listen(port, () => {
    console.log("✅ Server starting in", dev ? "development" : "production");
    console.log(`✅ Running at http://localhost:${port}`);
    console.log("✅ Loaded ENV ADMIN EMAIL:", process.env.ADMIN_EMAIL || "Not set");
  });
});

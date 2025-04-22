require('dotenv').config(); // Load environment variables from .env

const { createServer } = require('http');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let server = null;

app.prepare().then(() => {
  server = createServer((req, res) => {
    handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log('✅ Server ready on http://localhost:' + port);
  });
});

// Export server for cPanel/Passenger
module.exports = server;

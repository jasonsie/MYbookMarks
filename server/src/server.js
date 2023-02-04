const app = require('./app');
const http = require('http');
const { mongoConnect } = require('../services/mongo');

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();

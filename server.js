const http = require('http');
require('dotenv').config();
const app = require('./app');

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
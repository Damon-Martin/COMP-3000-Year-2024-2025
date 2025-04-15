import https from 'https';
import fs from 'fs';
import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// ES module trick
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;
const app = express();

// SSL configuration
const sslOptions = {
    key: fs.readFileSync(path.resolve(__dirname, './ssl-certs/private.key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './ssl-certs/domain.cert.pem')),
};

// Creating an HTTPS server
const server = https.createServer(sslOptions, app);

// Enabling CORS
app.use(cors({
  origin: ['https://localhost', 'https://comp3000-el-comercio.xyz'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'application/json'],
}));

const io = new Server(server, {
  cors: {
    origin: ['https://localhost', 'https://comp3000-el-comercio.xyz'],
    methods: ['GET', 'POST'],
  },
  transports: ['websocket', 'polling'],
});


const userRooms = {}; // Chatrooms for customers
const adminSockets = new Set(); // All Admins Sockets


io.on('connection', (socket) => {
    console.log('A new client connected:', socket.id);

    socket.on('support-chat', (msgObj) => {
      console.log(`message: ${msgObj.msg} from ${msgObj.username}`);
      socket.broadcast.emit('support-chat', msgObj);
    });

    /***************** Handling disconnects *********************/
    socket.on('disconnect', () => {
        console.log('User disconnected');

        // Remove socket from admin list if it was an admin
        adminSockets.delete(socket);
    });
});

server.listen(3000, () => {
  console.log(`Server is running on port: ${port}`);
});
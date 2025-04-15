const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const port = 3000;

// Initialising Socket Server with express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// each username (email) gets 1 chatroom
// this keeps track of them
const userRooms = {}; 

// During connection
io.on('connection', (socket) => {
    console.log('a user connected');
  
    /******************* Clients join using join-chat *************************/
    // Listen for the username (room) to join a specific chat room
    socket.on('join-chat', (username) => {
        // Checking if username is valid
        if (username) {
            console.log(`${username} has joined the chat`);
            
            // Add user to the chat room
            socket.join(username);
            
            // the key with the username will have the value of the socket.id (chat-room)
            userRooms[username] = socket.id;

            // Notifying the customer they are in the chat room
            socket.emit('joined-chat', `Welcome to the chat, ${username}`);
        }
    });
  
    /******************* Admins join using this one *************************/
    socket.on('support-chat', (data) => {
        const username = data.username;
        const msg = data.msg;

        // Logging the message
        console.log(`Message received from ${username}: ${msg}`);

        // Emmiting only to the specific users chatroom
        if (username && userRooms[username && msg]) {
            socket.to(data.username).emit('support-chat', msg); // Sending directly to person
        }
    });

    // Admin recieves a list of active users
    socket.on('get-active-users', () => {
        console.log('Active users: ', Object.keys(userRooms));
        socket.emit('active-users', Object.keys(userRooms));
    });

    // Handling a client disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(3000, () => {
  console.log(`Server is running on port: ${port}`);
});

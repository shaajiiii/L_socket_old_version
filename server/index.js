const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    },
})

io.on('connection', (socket) => { 
    console.log('CONNECTED >>>');
    console.log(`User ID : ${socket.id}\n`);

    // user defined
    socket.on('join_room',(roomId)=>{
        socket.join(roomId);
        console.log(`user :${socket.id} has joined Room : ${roomId}`);
    })

    socket.on('send_message',(data)=>{
        socket.to(data.room).emit('receive_message',data)
    })

    //====

    socket.on('disconnect', ()=>{
        console.log("DISCONNECTED >>>\n");
    })
})


server.listen(3001, () => {
    console.log('SERVER ON ');
})
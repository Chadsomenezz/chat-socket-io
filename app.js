const express = require('express');
const path = require('path');
const socket = require('socket.io');

//APP Setup
const app = express();
const server = app.listen(8080,()=>{
    console.log('listening at port 8080')
});

//static file
app.use(express.static(path.join(__dirname,'public')));

//socket setup
const io = socket(server);

//socket param is info from individual socket client
io.on('connection',(socket)=>{
    console.log('made socket connection',socket.id)

    socket.on('chat',(data)=>{
        //sockets refer to all sockets/ ie clients
        io.sockets.emit('chat',data);
    })

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    })
})

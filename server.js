const express = require('express');
const socket = require('socket.io');


const POST = 4000;
const app = express();
const server = app.listen(POST,()=>{
    console.log(`server is listening on port ${POST}`)
    console.log(`http://localhost:${POST}`)
});
const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
let peers = [];
const broadcastEventTypes ={
    ACTIVE_USER: 'ACTIVE_USER',
    GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
}


io.on('connection', (socket)=>{
    socket.emit('connection', null);
    console.log('new user connected');
    console.log(socket.id)
    socket.on('register-new-user', (data)=>{
        peers.push({
            userName: data.userName,
            socketId: data.socketId
        });
        io.sockets.emit('broadcast', {event: broadcastEventTypes.ACTIVE_USER, activeUsers: peers})
        console.log('register new user');
        console.log(peers)
    });
    socket.on('disconnect', ()=> {
        console.log('user disconnection');
        peers = peers.filter(peer=> peer.socketId !== socket.id)
        io.sockets.emit('broadcast', {event: broadcastEventTypes.ACTIVE_USER, activeUsers: peers})
    })

})
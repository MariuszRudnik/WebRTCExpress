const createPeerServerListener = (peerServer)=>{
    peerServer.on('connection', (client)=>{
        console.log('succesfully connection to peer js server')
        console.log(client.id)
    })
}

module.exports = {
    createPeerServerListener
}
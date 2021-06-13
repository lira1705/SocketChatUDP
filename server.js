const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// List of connected sockets
const sockets = [];

// List of sockets that made a connection, but are not registered yet
const socketsInRegistering = []

// Event that handle messages that are sent to 127.0.0.1:8081
server.on('message', (msg, rinfo) => {
    const user = getUser(rinfo);
    const message = msg.toString();
    if (user) {
        if (message === 'exit') {
            removeUser(user)
            return;
        }
        broadcast(user, message)
    } else {
        handleNewUser(rinfo, message)
    }
});

server.on('error',function(error){
    console.log('Error: ' + error);
});

rl.addListener('line', line => {
    broadcastServer(`Server: ${line}`)
})

const handleNewUser = (rinfo, msg) => {
    if (isUserRegistering(rinfo)) {
        registerUser(rinfo, msg);
    } else {
        socketsInRegistering.push({port: rinfo.port, address: rinfo.address});
        server.send('Welcome to chat UOL! Please send your contact name', rinfo.port, rinfo.address);
    }
}

const removeUser = (user) => {
    const userIndex = sockets.findIndex( socket => {
        return socket.port === user.port && socket.address === user.address
    });
    const removedUser = sockets.splice(userIndex, 1);
    server.send('See you later!', removedUser[0].port, removedUser[0].address);
    broadcastServer(`${removedUser[0].name} left the server`);
}

const getUser = (rinfo) => {
    return sockets.find( user => {
        return user.address === rinfo.address && user.port === rinfo.port
    })
}

const isUserRegistering = (rinfo) => {
    const userIndex = socketsInRegistering.findIndex( user => {
        return user.address === rinfo.address && user.port === rinfo.port
    })
    return userIndex !== -1
}

const registerUser = (rinfo, name) => {
    const registeredSocketIndex = socketsInRegistering.findIndex( socket => {
        return socket.port === rinfo.port && socket.address === rinfo.address
    });

    socketsInRegistering.splice(registeredSocketIndex, 1);
    const user = {port: rinfo.port, address: rinfo.address, name};
    sockets.push(user);
    broadcastServer(`${user.name} entered the server`, user);
}

const broadcast = (sender, msg) => {
    for (const user of sockets) {
        if (user.address !== sender.address || user.port !== sender.port) {
            server.send(`${sender.name}: ${msg}`, user.port, user.address)
        }
    }
}

const broadcastServer = (msg, topicUser = null) => {
    if (topicUser) {
        for (const user of sockets) {
            if (user.address !== topicUser.address || user.port !== topicUser.port) {
                server.send(msg, user.port, user.address)
            }
        }
    } else {
        for (const user of sockets) {
            server.send(msg, user.port, user.address)
        }
    }
}

// Binds server to 127.0.0.1:8081
server.bind(8081, '127.0.0.1');

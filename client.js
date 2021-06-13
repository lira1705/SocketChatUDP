var udp = require('dgram');
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var client = udp.createSocket('udp4');

// Listen to message to this socket and console.log it
client.on('message', (msg) => {
    console.log(msg.toString());
})

// Listen to the user input and send message to 127.0.0.1:8081
rl.addListener('line', line => { 
    client.send(line, 8081, '127.0.0.1')
})
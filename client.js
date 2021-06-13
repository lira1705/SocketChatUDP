var udp = require('dgram');
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var client = udp.createSocket('udp4');

client.on('message', (msg) => {
    console.log(msg.toString());
})

rl.addListener('line', line => {
    client.send(line, 8081, '127.0.0.1')
})
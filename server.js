const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', function connection(ws) {
    console.log('✅ WebSocket Client Connected');

    ws.on('message', function incoming(message) {
        console.log('🚨 Drowsiness Alert:', message.toString());
        // You can save to DB or trigger notification here
    });

    ws.on('close', () => console.log('❌ WebSocket Client Disconnected'));
});

server.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
});

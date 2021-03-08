"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
setTimeout(() => { }, 10000);
const socket = socket_io_client_1.io();
// Game.init(io);
console.log('connecting');
socket.on('connect', () => {
    console.log('Connected');
    document.getElementById('connecting-h2').innerHTML = '<input id="username-input" placeholder="Username"></input>';
});
socket.on('disconnect', () => {
    console.log('Disconnected');
    document.getElementById('username-input').innerHTML = '<h2 id="connecting-h2">Connecting...<h2';
});
//# sourceMappingURL=main.js.map
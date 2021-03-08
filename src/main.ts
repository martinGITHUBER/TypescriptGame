import { io } from 'socket.io-client';
import Game  from './game';

setTimeout(() => {
	const socket = io();

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
}, 1000);

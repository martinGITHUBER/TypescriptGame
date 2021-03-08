import { io } from 'socket.io-client';
import Game  from './game';
import * as $ from "jquery";

setTimeout(() => {
	const socket = io();

	// Game.init(io);
	console.log('connecting');
	socket.on('connect', () => {
		console.log('Connected');
		$('#connecting-h2').fadeOut(1000, 'swing', () => {
			$('#connecting-h2').html('<input id="username-input" placeholder="Username"></input>');
			$('#username-input').fadeIn(1000);
		});
	});
	
	socket.on('disconnect', () => {
		console.log('Disconnected');
		$('#username-input').fadeOut(1000, 'swing', () => {
			$('#username-input').html('<h2 id="connecting-h2">Connecting...<h2>');
			$('#connecting-h2').fadeIn(1000);
		});
		
	});
}, 1000);

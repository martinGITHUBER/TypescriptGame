import { io } from 'socket.io-client';
import Game  from './game';
import $ from "jquery";

setTimeout(() => {
	const socket = io();

	// Game.init(io);
	console.log('connecting');
	socket.on('connect', () => {
		$('#connecting-h2').fadeOut(500, 'swing', () => {
			$('#connecting-h2').replaceWith('<input id="username-input" placeholder="Username" style="display:none;"></input>');
			$('#username-input').fadeIn(500);
		});
	});
	
	socket.on('disconnect', () => {
		setTimeout(() => {
			$('#username-input').fadeOut(500, 'swing', () => {
				$('#username-input').replaceWith('<h2 id="connecting-h2" style="display:none;">Connecting...<h2>');
				$('#connecting-h2').fadeIn(500);
			});
		}, 1000);
	});
}, 1000);

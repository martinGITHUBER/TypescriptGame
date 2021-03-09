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

		document.addEventListener('keydown', event => {
			if(event.key == 'Enter') {
				if((<any>$('#username-input').val()).length > 0) {
					socket.emit('join', $('#username-input').val());
				}
			} else if(!['Backspace', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
				// @ts-ignore
				if((<any>$('#username-input').val()).length >= 12) event.preventDefault()// $('#username-input').val($('#username-input').val().split('').splice(0, $('#username-input').val().split('').length - 1).join(""));
			}
		});

		socket.on('invalid_name', () => {
			$('#username-input').appendTo('<h3 style="color:red;">Name already taken<h3>');
		});
	});
	
	socket.on('disconnect', () => {
		document.getElementsByTagName('body')[0].innerHTML = '<h2 id="connecting-h2" style="display:none;">Connecting...<h2>';
		setTimeout(() => {
			$('#connecting-h2').fadeIn(500);
		}, 1000);
	});
}, 1000);

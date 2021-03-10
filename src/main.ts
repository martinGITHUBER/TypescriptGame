import { io } from 'socket.io-client';
import Game	from './game';
import $ from "jquery";

setTimeout(() => {
	const socket = io();
	const connecting_h2 = '<h2 id="connecting-h2" style="display:none;">Connecting...<h2>';
	const username_input = '<input autocomplete=off id="username-input" placeholder="Username" style="display:none;"></input>';

	// Game.init(io);
	console.log('connecting');
	socket.on('connect', () => {
		console.log('connected');
		$('#connecting-h2').fadeOut(500, 'swing', () => {
			$('#connecting-h2').replaceWith(username_input);
			$('#username-input').fadeIn(500);
		});

		document.addEventListener('keydown', event => {
			if(event.key == 'Enter') {
				try{
					$('#username-input-h3').remove();
				} catch(x){
					return;
				}
				if((<any>$('#username-input').val()).length > 0) {
					socket.emit('join', $('#username-input').val());
				}
			} else if(!['Backspace', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
				// @ts-ignore
				if((<any>$('#username-input').val()).length >= 12){
					event.preventDefault();
				} else{
					try{
						$('#username-input-h3').remove();
					} catch(x){
						return;
					}
				}
			}
		});

		socket.on('invalid_name', () => {
			console.log('invalid name');
			$('body').append('<h3 id="invalid-name-h3" style="color: red; margin-top: 0.4em; display: none">Name already taken</h3>');
			$('#invalid-name-h3').fadeIn(500);
		});
	});
	
	socket.on('disconnect', () => {
		try{
			$('#username-input-h3').remove();
		} catch(x){
			return;
		}
		console.log('disconnected');
		document.getElementsByTagName('body')[0].innerHTML = connecting_h2;
		setTimeout(() => {
			$('#connecting-h2').fadeIn(500);
		}, 1000);
	});
}, 1000);

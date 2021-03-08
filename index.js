const express = require('express');
const path = require('path');
const io = require('socket.io')(server);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
	console.log('server started');
});

const board = {
	players: []
}

io.on('connection', socket => {
	let player_name = '';
	let in_game = false;
	let move_cooldown;


	socket.on('join', player => {
		if(board.players.find(p => p.name = player.name)){
			return socket.emit("invalid_name");
		}

		const player_obj = {
			name: player.name,
			x: 200,
			y: 200,
			speed,
			direction: 'NONE'
		};

		board.players.push(player_obj);

		player_name == player.name;
		in_game = true;
		socket.emit("joined", player_obj);
	});

	const interval = setInterval(100, () => {
		socket.emit("update", board);
	});

	socket.on('move', direction => {
		const player = board.players.find(p => p.name == player_name);
		if(!in_game || !player.can_move) return;

		switch(direction) {
			case 'UP':
				player.y += player.speed;
			case 'DOWN':
				player.y -= player.speed;
			
		}

		player.can_move = false;
		move_cooldown = setTimeout(() => player.can_move == true, 100)
	});

	socket.on('disconnect', () => {
		clearInterval(interval);

		board.players.splice(board.players.indexOf(board.players.find(p => p.name == player.name)), 1);
	});
});
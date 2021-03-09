const express = require('express');
const app = express();

const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
	console.log('server started');
});

const board = {
	width: 400,
	height: 400,
	players: [{
		name: 'test',
	}],
};

// eslint-disable-next-line no-unused-vars
const tick = setInterval(() => {
	board.players.forEach(player => {
		if(player.name == 'test') return;
		switch(player.direction.toUpperCase()) {
		case 'UP':
			if(player.y - player.size <= 0) {
				player.y += player.speed;
				break;
			}

			player.y -= player.speed;
			break;

		case 'DOWN':
			if(player.y + player.size >= board.height) {
				player.y -= player.speed;
				break;
			}

			player.y += player.speed;
			break;

		case 'LEFT':
			if(player.x - player.size <= 0) {
				player.x += player.speed;
				break;
			}

			player.x -= player.speed;
			break;

		case 'RIGHT':
			if(player.x + player.size >= board.width) {
				player.x -= player.speed;
				break;
			}

			player.x += player.speed;
			break;
		default:
			return;
		}
	});
}, 100);

io.on('connection', socket => {
	const player_name = '';
	let in_game = false;
	console.log(`Socket connected with id: ${socket.id}`);

	socket.on('join', name => {
		console.log(name);
		if(board.players.find(p => p.name = name)) {
			return socket.emit('invalid_name');
		}

		const player_obj = {
			name,
			id: socket.id,
			size: 10,
			x: 200,
			y: 200,
			speed: 5,
			direction: 'NONE',
		};

		board.players.push(player_obj);

		player_name == name;
		in_game = true;
		console.log(`User joined game. Name: ${name}`);
		socket.emit('joined', player_obj);
	});

	const interval = setInterval(() => {
		socket.emit('update', board);
	}, 100);

	socket.on('move', direction => {
		if(!in_game) return;
		const player = board.players.find(p => p.name == player_name);

		if(direction.toUpperCase() == 'UP' && direction.toUpperCase() == 'DOWN' && direction.toUpperCase() == 'RIGHT' && direction.toUpperCase() == 'LEFT') {
			player.direction = direction.toUpperCase();
		}
	});

	socket.on('disconnect', () => {
		clearInterval(interval);

		board.players.splice(board.players.indexOf(board.players.find(p => p.name == player_name)), 1);
	});
});
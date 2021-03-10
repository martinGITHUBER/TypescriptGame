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
/* const tick = setInterval(() => {
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
}, 100); */

setInterval(() => {
	board.players.forEach(player => {
		io.to(player.id).emit('update', board);
	});
}, 100);
	
io.on('connection', socket => {
	console.log(board);
	let in_game = false;
	const player = () => in_game ? board.players.find(p => p.id == socket.id) : false;
	let name = '';
	console.log(`Socket connected with id: ${socket.id}`);

	socket.on('join', new_name => {
		console.log(board);
		console.log(`old name: ${name}\nnew name: ${new_name}`);
		if(board.players.find(p => p.name == new_name && p.id != socket.id)) {
			console.log('invalid name');
			return socket.emit('invalid_name');
		}
		if(board.players.find(p => p.id == socket.id) && name != new_name) {
			console.log('name change');
			board.players.splice(board.players.indexOf(p => p.id == socket.id), 1);
			return socket.disconnnect();
		}
		else if(board.players.find(p => p.id == socket.id) && name == new_name) {
			console.log('same name return');
			return;
		}

		board.players.push({
			name: new_name,
			id: socket.id,
			size: 10,
			x: 200,
			y: 200,
			speed: 5,
			direction: 'NONE',
		});

		console.log(board.players.find(p => p.name == new_name));

		name = new_name;
		in_game = true;
		console.log(`User joined game. Name: ${name}`);
		socket.emit('joined', board.players.find(p => p.name == name));
	});

	socket.on('move', direction => {
		if(!in_game) return;
		const player = board.players.find(p => p.name == name);

		if(direction.toUpperCase() == 'UP' && direction.toUpperCase() == 'DOWN' && direction.toUpperCase() == 'RIGHT' && direction.toUpperCase() == 'LEFT') {
			player.direction = direction.toUpperCase();
		}
	});

	socket.on('disconnect', () => {
		clearInterval(interval);

		if(name) {
			board.players.splice(board.players.indexOf(board.players.find(p => p.id == socket.id)), 1);
		}

		console.log(board);
	});
});
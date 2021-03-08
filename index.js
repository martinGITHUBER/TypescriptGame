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
	players: [],
}

const tick = setInterval(() => {
  board.players.forEach(player => {
    switch(player.direction.toUpperCase()){
      case 'UP':
        if(player.y - player.size <= 0) {
          player.y += speed;
          break
        }

        player.y -= speed;
        break;

      case 'DOWN':
        if(player.y + player.size >= board.height) {
          player.y -= speed;
          break;
        }

        player.y += speed;
        break;

      case 'LEFT':
        if(player.x - player.size <= 0) {
          player.x += speed;
          break;
        }

        player.x -= speed;
        break;

      case 'RIGHT':
        if(player.x + player.size >= board.width) {
          player.x -= speed;
          break;
        }

        player.x += speed;
        break;
      default:
        return
    }
  })
}, 100)

io.on('connection', socket => {
	let player_name = '';
	let in_game = false;
  console.log(`Socket connected with id: ${socket.id}`);

	socket.on('join', player => {
    console.log(player);
		if(board.players.find(p => p.name = player.name)){
			return socket.emit('invalid_name');
		}

		const player_obj = {
			name: player.name,
      id: socket.id,
      size: 10,
			x: 200,
			y: 200,
			speed: 5,
			direction: 'NONE'
		};

		board.players.push(player_obj);

		player_name == player.name;
		in_game = true;
    console.log(`User joine game. Object: ${player}`);
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

		board.players.splice(board.players.indexOf(board.players.find(p => p.name == player.name)), 1);
	});
});
// @ts-ignore
import { Canvas, Board, Controls } from './ux/index.ts';
// @ts-ignore
import { ClockTick, Timer, Direction } from './types/index.ts'
// @ts-ignore
import { Player } from './objects/index.ts';

export class Game {
	static clock: Timer;
	static player: Player;
  	static is_running: boolean = false;

  	static init() {
    	Canvas.init(<HTMLCanvasElement>document.querySelector("#canvas"));
		Game.ready();
 	}

  	static ready() {
		Board.init();
  	  	Board.draw();

		Game.player = new Player({ X: Board.width / 2, Y: Board.height / 2 });
		Game.player.direction = Direction.RIGHT;

		Game.clock = new Timer(1000, 0, Game.on_clock_tick);
  	}

  	static start() {
		if(Game.is_running) return;
		if(Game.clock.is_paused) return Game.pause();

		Game.is_running = true;
		Game.clock.start();
  	}

  	static pause() {	
		if(Game.clock.is_paused) {
			Game.is_running = true;
			return Game.clock.resume();
		}

		Game.clock.pause();
		Game.is_running = false;
  	}

	static reset() {
		Game.clock && Game.clock.stop();
		Game.is_running = false;
		Game.ready();
	}

	static on_clock_tick() {
		Controls.process_input();
        Game.player.process_turn();

		Board.draw();
	}
}

Game.init();
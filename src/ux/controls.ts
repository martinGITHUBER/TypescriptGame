// @ts-ignore
import { Direction, GameKey } from '../types/index.ts';
// @ts-ignore
import { Game } from '../game.ts';

export class Controls {
	static last_key: number = null;
	static on_key_up = (ev: KeyboardEvent) => { Controls.last_key == ev.keyCode };

	static proccess_input() {
		if(!Controls.last_key) return;

		switch(Controls.last_key) {
			case GameKey.UP:
                if (Game.player.direction != Direction.DOWN) {
                    Game.player.direction = Direction.UP;
                }
                break;

            case GameKey.DOWN:
                if (Game.player.direction != Direction.UP) {
                    Game.player.direction = Direction.DOWN;
                }
                break;

            case GameKey.LEFT:
                if (Game.player.direction != Direction.RIGHT) {
                    Game.player.direction = Direction.LEFT;
                }
                break;

            case GameKey.RIGHT:
                if (Game.player.direction != Direction.LEFT) {
                    Game.player.direction = Direction.RIGHT;
                }
                break;
		}

		Controls.last_key = null
	}
}
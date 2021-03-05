// @ts-ignore
import { Canvas } from './ux/index.ts';
// @ts-ignore
import { ClockTick, Timer, Direction } from './types/index.ts'
// @ts-ignore
import { Player } from './objects/index.ts';

export class Game {
  static clock: Timer;
  static player: Player;

  static init() {
    Canvas.init(<HTMLCanvasElement>document.querySelector("#canvas"));
    Canvas.fill("black");

    const timer = new Timer(5000, 0, () => alert("hi"));
    timer.start();
  }
}

Game.init();
// @ts-ignore
import { Canvas } from './ux/index.ts';
// @ts-ignore
import { ClockTick, Timer, Direction } from './types/index.ts'

export class Game {
  static init() {
    Canvas.init(<HTMLCanvasElement>document.querySelector("#canvas"));
    Canvas.fill("black");

    const timer = new Timer(5000, 0, () => alert("hi"));
    timer.start();
  }
}

Game.init();
// @ts-ignore
import { Canvas } from './ux/index.ts';

export class Game {
  static init() {
    Canvas.init(<HTMLCanvasElement>document.querySelector("#canvas"));
    Canvas.fill("black");
  }
}

Game.init();
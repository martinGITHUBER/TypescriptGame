/* tslint:disable */
import { Canvas } from './ux/index.ts';
/* tslint:enable */

export class Game {
  static init() {
    Canvas.init(<HTMLCanvasElement>document.querySelector("#canvas"));
    Canvas.fill("black");
  }
}
// @ts-ignore
import { io } from "socket.io-client";

export class Game {
  // @ts-ignore
  static socket: Socket;

  static init() {
    Game.socket = io();
  }
}

Game.init();
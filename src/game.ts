import { Socket } from "socket.io-client";
import { Timer } from "./types/timer";

export default class Game {	
	// @ts-ignore
	static socket: Socket;
	static readonly clock: Timer;

	static init(socket: Socket) {

	}

	static ready() {

	}
}
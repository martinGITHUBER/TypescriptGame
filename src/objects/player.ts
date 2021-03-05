// @ts-ignore
import { Speed, Direction, Position, ScreenEdge, ClockTick, IPlayerObject, IGameObject } from '../types/index.ts';
// @ts-ignore
import { Game } from '../game.ts';
// @ts-ignore
import { IDrawable } from '../types/gameobjects.ts';
// @ts-ignore
import { Board } from '../ux/index.ts';

export class Player implements IPlayerObject {
  public speed: Speed = Speed.NORMAL;
  public direction: Direction = Direction.NONE;
  public position: Position;

  constructor(position: Position) {
    this.position = position;

  }
}
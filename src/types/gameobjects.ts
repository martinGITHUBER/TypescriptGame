// @ts-ignore
import { Position } from './position.ts';
// @ts-ignore
import { Player } from '../objects/player.ts';

export interface IDrawable {
  position: Position;
  draw(): void
}

export interface IPlayerObject extends IDrawable {

}

export interface IGameObject extends IDrawable {
  handle_collision(object: Player): void
}
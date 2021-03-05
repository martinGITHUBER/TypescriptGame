// @ts-ignore
import { Speed, Direction, Position, ScreenEdge, ClockTick, IPlayerObject, IGameObject } from '../types/index.ts';
// @ts-ignore
import { Game } from '../game.ts';
// @ts-ignore
import { IDrawable } from '../types/gameobjects.ts';
// @ts-ignore
import { Board, Canvas } from '../ux/index.ts';

export class Player implements IPlayerObject {
  public speed: Speed = Speed.NORMAL;
  public move_distance: number = 10;
  public direction: Direction = Direction.NONE;
  public position: Position;

  constructor(position: Position) {
    this.position = position;

    Board.place_object(this, position);
  }

  public move() {
    const position: Position = Position.copy(this.position);

    switch(this.direction) {
      case Direction.UP:
        position.Y += this.move_distance;
        break;
      case Direction.DOWN:
        position.Y -= this.move_distance;
        break;
      case Direction.LEFT:
        position.X -= this.move_distance;
        break;
      case Direction.RIGHT:
        position.X += this.move_distance;
        break;
    }

    this.update_board(position);
  }

  public on_hit_screen_edge(edge: ScreenEdge) {
		switch (edge) {
			case ScreenEdge.NORTH:
        this.position.Y = Board.height;
			case ScreenEdge.SOUTH:
        this.position.Y = 0;
			case ScreenEdge.EAST:
        this.position.X = 0
			case ScreenEdge.WEST:
        this.position.X = Board.width;
		}
	}
	
	public set_speed(speed: number) {
		this.speed = speed;
	}

	private update_board(position: Position) {
		Board.move_object(this, position);
	}
}
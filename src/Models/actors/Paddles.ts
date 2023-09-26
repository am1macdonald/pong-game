import { Actor, Vertex } from "../../types/Actor.ts";
import { Command, Controllable, Coordinate, Dimensions } from "../../types/types.ts";

export type PaddleDirection = 1 | 0 | -1;

export interface PaddleActor extends Actor, Controllable {}

const Paddle = (side: "left" | "right", controller: "player" | "computer"): PaddleActor => {
  let _ctx: CanvasRenderingContext2D;
  let _canvas: HTMLCanvasElement;
  let _position: Coordinate;
  let _initial: Coordinate;
  const _dimensions: Dimensions = { height: 0, width: 0 };
  const _vy: number = 6;
  const _vx: number = 0;
  let _yDir: PaddleDirection = controller === "player" ? 0 : controller === "computer" ? getRandomDirection() : 1;

  if (!side) {
    throw new Error("PaddleActor: Pick a side!");
  }

  function getRandomDirection(): 1 | -1 {
    if (Math.floor(Math.random() * 2) === 0) {
      return 1;
    } else {
      return -1;
    }
  }

  function updateConfiguration() {
    if (_canvas) {
      _dimensions.height = _canvas.clientHeight / 5;
      _dimensions.width = _dimensions.height / 5;
      const tenth = _canvas.clientWidth / 10;
      _initial = {
        x: side === "left" ? tenth : _canvas.clientWidth - tenth,
        y: _canvas.clientHeight / 2,
      };
    }
    reset();
  }

  function updatePosition() {
    _position.y += _vy * _yDir;
  }

  function checkPath() {
    const yDest = _position.y + _vy * _yDir + (_dimensions.height * _yDir) / 2;
    if (yDest < 0 || yDest > _canvas.clientHeight) {
      if (controller === "player") {
        _yDir *= 0;
      } else {
        _yDir *= -1;
      }
    }
  }

  function reset() {
    _position = _initial;
  }

  function draw() {
    if (!_ctx) {
      throw new Error("Pongball: no context");
    }
    _ctx.fillStyle = "white";
    _ctx.fillRect(
      _position.x - _dimensions.width / 2,
      _position.y - _dimensions.height / 2,
      _dimensions.width,
      _dimensions.height,
    );
    checkPath();
    updatePosition();
  }

  function setCtx(ctx: CanvasRenderingContext2D) {
    _ctx = ctx;
    updateConfiguration();
  }

  function setCanvas(canvas: HTMLCanvasElement) {
    _canvas = canvas;
    updateConfiguration();
  }

  function getVertices(pos: Coordinate = _position, dims: Dimensions = _dimensions): Array<Vertex> {
    return [
      [pos.x - dims.width / 2, pos.y - dims.height / 2],
      [pos.x + dims.width / 2, pos.y - dims.height / 2],
      [pos.x + dims.width / 2, pos.y + dims.height / 2],
      [pos.x - dims.width / 2, pos.y + dims.height / 2],
    ];
  }

  function getPosition(): Coordinate {
    return _position;
  }

  function setActors(): void {}

  function getVelocity() {
    return {
      vx: _vx,
      vy: _vy,
    };
  }

  function execute(command: Command<PaddleDirection, PaddleDirection, PaddleDirection>) {
    _yDir = command.execute();
  }

  return { setCtx, setCanvas, draw, getVertices, setActors, getVelocity, getPosition, execute };
};

export default Paddle;

export function makeChangePaddleDirectionCommand(value: PaddleDirection) {
  return { execute: () => value } as Command<PaddleDirection, PaddleDirection, PaddleDirection>;
}

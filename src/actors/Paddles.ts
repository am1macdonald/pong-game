import { Actor, Vertex } from "../types/Actor.ts";
import { Coordinate, Dimensions } from "../types/types.ts";

export type Dimension = number;

export interface PaddleActor extends Actor {}

const Paddle = (side: "left" | "right"): PaddleActor => {
  let _ctx: CanvasRenderingContext2D;
  let _canvas: HTMLCanvasElement;
  let _position: Coordinate;
  let _initial: Coordinate;
  const _dimensions: Dimensions = { height: 0, width: 0 };
  const _vy: number = 3;
  const _vx: number = 0;
  let _yDir: 1 | -1 = getRandomDirection();
  let _actors: Array<Actor>;

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
      _yDir *= -1;
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

  function getVertices(): Array<Vertex> {
    return [
      [_position.x - _dimensions.width / 2, _position.y - _dimensions.height / 2],
      [_position.x + _dimensions.width / 2, _position.y - _dimensions.height / 2],
      [_position.x + _dimensions.width / 2, _position.y + _dimensions.height / 2],
      [_position.x - _dimensions.width / 2, _position.y + _dimensions.height / 2],
    ];
  }

  function setActors(actors: Array<Actor>): void {
    _actors = actors;
  }

  function getVelocity() {
    return {
      vx: _vx,
      vy: _vy,
    };
  }

  return { setCtx, setCanvas, draw, getVertices, setActors, getVelocity };
};

export default Paddle;

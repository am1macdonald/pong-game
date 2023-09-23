import { Actor } from "../types/Actor.ts";
import { Coordinate } from "../types/types.ts";

export type Dimension = number;

export interface PongBallActor extends Actor {}

const PongBall = ((): PongBallActor => {
  let _ctx: CanvasRenderingContext2D;
  let _canvas: HTMLCanvasElement;
  let _position: Coordinate;
  let _initial: Coordinate;
  let _dimension: Dimension;
  const _vx: number = 1;
  let _xDir: 1 | -1 = getRandomDirection();
  const _vy: number = 1;
  let _yDir: 1 | -1 = getRandomDirection();

  function getRandomDirection(last: number | undefined = 0) {
    if (Math.floor(Math.random() * 2) === 0) {
      return last + 1;
    } else {
      return -(last + 1);
    }
  }

  function updateConfiguration() {
    if (_canvas) {
      _dimension = _canvas.clientWidth / 30;
      _initial = {
        x: _canvas.clientWidth / 2,
        y: _canvas.clientHeight / 2,
      };
    }
    reset();
  }

  function updatePosition() {
    _position.x += _vx * _xDir;
    _position.y += _vy * _yDir;
  }

  function checkPath() {
    const xDest = _position.x + _vx * _xDir + (_dimension * _xDir) / 2;
    if (xDest < 0 || xDest > _canvas.clientWidth) {
      _xDir *= -1;
    }
    const yDest = _position.y + _vy * _yDir + (_dimension * _yDir) / 2;
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
    const half = _dimension / 2;
    _ctx.fillRect(_position.x - half, _position.y - half, _dimension, _dimension);
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
  return { setCtx, setCanvas, draw };
})();

export default PongBall;

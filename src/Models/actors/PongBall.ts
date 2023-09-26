import { Actor, Vertex } from "../../types/Actor.ts";
import { Coordinate } from "../../types/types.ts";

export type Dimension = number;

export interface PongBallActor extends Actor {}

const PongBall = ((): PongBallActor => {
  let _ctx: CanvasRenderingContext2D;
  let _canvas: HTMLCanvasElement;
  let _position: Coordinate;
  let _initial: Coordinate;
  let _dimension: Dimension;
  const _vx: number = 4;
  let _xDir: 1 | -1 = getRandomDirection();
  const _vy: number = 4;
  let _yDir: 1 | -1 = getRandomDirection();
  let _actors: Array<Actor>;

  function getRandomDirection(): 1 | -1 {
    if (Math.floor(Math.random() * 2) === 0) {
      return 1;
    } else {
      return -1;
    }
  }

  function updateConfiguration() {
    if (_canvas) {
      _dimension = _canvas.clientWidth / 30;
      _initial = {
        x: _canvas.clientWidth / 2,
        y: _canvas.clientHeight / 2,
      };
      reset();
    } else {
      throw new Error("updateConfig: No Canvas");
    }
  }

  function getNextPosition(): Coordinate {
    return {
      x: _position.x + _vx * _xDir,
      y: _position.y + _vy * _yDir,
    };
  }

  function updatePosition() {
    const next = getNextPosition();
    const xDest = next.x + _vx * _xDir + (_dimension * _xDir) / 2;
    const yDest = next.y + _vy * _yDir + (_dimension * _yDir) / 2;
    if (xDest < 0 || xDest > _canvas.clientWidth) {
      _xDir *= -1;
      _yDir = getRandomDirection();
      reset();
    } else if (yDest < 0 || yDest > _canvas.clientHeight) {
      _yDir *= -1;
      _position = getNextPosition();
    } else {
      _actors.forEach((curr) => {
        const myVerts = getVertices();
        const yourVerts = curr.getVertices();
        if (checkForCollision(myVerts, yourVerts)) {
          const oV = curr.getVelocity().vy;
          if (myVerts[2][1] - (_vy + oV) <= yourVerts[0][1] || myVerts[0][1] + _vy + oV >= yourVerts[2][1]) {
            _yDir *= -1;
            _position.y += _yDir * (_vy + oV);
          } else _xDir *= -1;
        }
      });
      _position = getNextPosition();
    }
  }

  function checkForCollision(boxOne: Array<Vertex>, boxTwo: Array<Vertex>) {
    return (
      boxOne[0][0] < boxTwo[1][0] &&
      boxOne[1][0] > boxTwo[0][0] &&
      boxOne[3][1] > boxTwo[0][1] &&
      boxOne[0][1] < boxTwo[3][1]
    );
  }

  function reset() {
    _position = { ..._initial };
  }

  function draw() {
    if (!_ctx) {
      throw new Error("Pongball: no context");
    }
    updatePosition();
    _ctx.fillStyle = "white";
    const half = _dimension / 2;
    _ctx.fillRect(_position.x - half, _position.y - half, _dimension, _dimension);
  }

  function setCtx(ctx: CanvasRenderingContext2D) {
    _ctx = ctx;
    updateConfiguration();
  }

  function setCanvas(canvas: HTMLCanvasElement) {
    _canvas = canvas;
    updateConfiguration();
  }

  function getVertices(pos: Coordinate = _position, dims: Dimension = _dimension): Array<Vertex> {
    return [
      [pos.x - dims / 2, pos.y - dims / 2],
      [pos.x + dims / 2, pos.y - dims / 2],
      [pos.x + dims / 2, pos.y + dims / 2],
      [pos.x - dims / 2, pos.y + dims / 2],
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
})();

export default PongBall;

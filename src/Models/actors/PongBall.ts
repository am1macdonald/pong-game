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
        const collision = checkForCollision(curr);
        if (collision > 0) {
          if (collision & (1 << 0)) {
            // collision with upper surface
            _position.y -= _vy + curr.getVelocity().vy;
            if (_yDir > 0)
              // travelling downwards
              _yDir = -1;
          } else if (collision & (1 << 1)) {
            // collision with lower surface
            _position.y += _vy + curr.getVelocity().vy;
            if (_yDir < 0)
              // travelling upwards
              _yDir = 1;
          }

          if (collision & (1 << 2)) {
            // collision with left surface
            _position.x -= _vx + curr.getVelocity().vx;
            if (_xDir > 0)
              // travelling rightwards
              _xDir = -1;
          } else if (collision & (1 << 3)) {
            // collision with right surface
            _position.x += _vx + curr.getVelocity().vx;

            if (_xDir < 0)
              // travelling leftwards
              _xDir = 1;
          }
        }
      });
      _position = getNextPosition();
    }
  }

  function checkForCollision(actor: Actor): number {
    const eps = 1e-3;
    const boxOne = getVertices();
    const boxTwo = actor.getVertices();

    if (
      !(
        boxOne[0][0] < boxTwo[1][0] &&
        boxOne[1][0] > boxTwo[0][0] &&
        boxOne[3][1] > boxTwo[0][1] &&
        boxOne[0][1] < boxTwo[3][1]
      )
    ) {
      return -1;
    }

    // calculate bias flag in each direction
    const bias_X = _position.x < actor.getPosition().x;
    const bias_Y = _position.y < actor.getPosition().y;

    // calculate penetration depths in each direction
    const pen_X = bias_X ? boxOne[0][0] - boxTwo[1][0] : boxTwo[0][0] - boxOne[1][0];
    const pen_Y = bias_Y ? boxOne[2][1] - boxTwo[0][1] : boxTwo[2][1] - boxOne[0][1];
    const diff = pen_X - pen_Y;

    if (diff > eps) {
      return 1 << (bias_Y ? 0 : 1);
    } else if (diff < -eps) {
      return 1 << (bias_X ? 2 : 3);
    } else {
      return (1 << (bias_Y ? 0 : 1)) | (1 << (bias_X ? 2 : 3));
    }
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
      vx: _vx * _xDir,
      vy: _vy * _yDir,
    };
  }

  function getPosition(): Coordinate {
    return _position;
  }

  return { setCtx, setCanvas, draw, getVertices, setActors, getVelocity, getPosition };
})();

export default PongBall;

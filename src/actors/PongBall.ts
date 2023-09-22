import { Actor } from "../types/Actor.ts";
import { Coordinate, Dimensions } from "../types/types.ts";

export interface PongBallActor extends Actor {}

const PongBall = ((): PongBallActor => {
  let _ctx: CanvasRenderingContext2D;
  let _canvas: HTMLCanvasElement;
  let _position: Coordinate;
  let _dimensions: Dimensions;

  function draw() {
    _ctx.fillRect(_position.x, _position.y, _position.x + _dimensions.width, _position.y + _dimensions.height);
  }

  function setCtx(ctx: CanvasRenderingContext2D) {
    _ctx = ctx;
  }

  function setCanvas(canvas: HTMLCanvasElement) {
    _canvas = canvas;
    update();
  }

  function update() {
    if (_canvas) {
      const dim = _canvas.clientWidth / 15;
      _dimensions = {
        width: dim,
        height: dim,
      };
    }
  }

  function reset() {}
  return { setCtx, setCanvas, draw };
})();

export default PongBall;

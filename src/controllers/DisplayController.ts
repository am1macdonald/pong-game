import { Actor } from "../types/Actor.ts";

const displayController = (() => {
  // PRIVATE

  const ASPECT_RATIO = 4 / 3;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.className = "main";
  const backgroundCanvas = document.createElement("canvas");
  const backgroundCtx = backgroundCanvas.getContext("2d");
  backgroundCanvas.className = "background";
  const _actors: Actor[] = [];
  let _animating: boolean = false;

  if (!canvas || !backgroundCanvas) {
    throw new Error("no canvas!!!");
  }

  if (!ctx || !backgroundCtx) {
    throw new Error("Display Controller: no context");
  }

  function resizeCanvas(div: HTMLElement) {
    if (div.clientWidth >= div.clientHeight) {
      [canvas, backgroundCanvas].forEach((c) => {
        c.width = div.clientWidth;
        c.height = div.clientWidth / ASPECT_RATIO;
      });
    } else {
      [canvas, backgroundCanvas].forEach((c) => {
        c.width = div.clientHeight;
        c.height = div.clientHeight / ASPECT_RATIO;
      });
    }
    drawBackground();
  }

  function updateFrame() {
    if (!_animating) {
      return;
    }
    window?.requestAnimationFrame(() => {
      if (!ctx) {
        throw new Error("update frame: no context!");
      }
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      _actors.forEach((x) => x.draw());
      updateFrame();
    });
  }

  function drawBackground() {
    if (!backgroundCtx) {
      throw new Error("update frame: no context!");
    }
    backgroundCtx.fillStyle = "white";
    const half = canvas.clientWidth / 2;
    backgroundCtx.fillRect(half - 40, half - 40, canvas.clientWidth / 2, canvas.clientHeight / 2);
  }

  // PUBLIC
  function attachToView(div: HTMLElement) {
    resizeCanvas(div);
    div.appendChild(canvas);
    div.appendChild(backgroundCanvas);
  }

  function registerActor(actor: Actor) {
    _actors.push(actor);
  }

  function registerActors(actors: Array<Actor>) {
    actors.forEach((x) => _actors.push(x));
  }

  function updateActors() {
    if (ctx) {
      _actors.forEach((x) => {
        x.setActors(_actors.filter((actor) => actor !== x));
        x.setCanvas(canvas);
        x.setCtx(ctx);
      });
    } else {
      throw new Error("Update Actors: No context");
    }
  }

  function start() {
    _animating = true;
    updateActors();
    updateFrame();
  }

  function stop() {
    _animating = false;
  }

  function reset() {
    ctx?.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  }

  return {
    attachToView,
    registerActor,
    registerActors,
    start,
    stop,
    reset,
  };
})();

export default displayController;

export type DisplayController = typeof displayController;

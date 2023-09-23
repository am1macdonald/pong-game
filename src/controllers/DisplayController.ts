import { Actor } from "../types/Actor.ts";

const displayController = (() => {
  // PRIVATE

  const ASPECT_RATIO = 4 / 3;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const _actors: Actor[] = [];
  let _animating: boolean = false;

  if (!canvas) {
    throw new Error("no canvas!!!");
  }

  if (!ctx) {
    throw new Error("Display Controller: no context");
  }

  function resizeCanvas(div: HTMLElement) {
    if (div.clientWidth >= div.clientHeight) {
      canvas.width = div.clientWidth;
      canvas.height = div.clientWidth / ASPECT_RATIO;
    } else {
      canvas.width = div.clientHeight;
      canvas.height = div.clientHeight / ASPECT_RATIO;
    }
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

  // PUBLIC
  function attachToView(div: HTMLElement) {
    resizeCanvas(div);
    div.appendChild(canvas);
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
        x.setCtx(ctx);
        x.setCanvas(canvas);
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

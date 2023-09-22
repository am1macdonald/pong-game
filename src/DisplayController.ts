import { Actor } from "./types/Actor.ts";

const DisplayController = (() => {
  // PRIVATE

  const ASPECT_RATIO = 4 / 3;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const _actors: Actor[] = [];
  let _animating: boolean = false;

  if (!canvas) {
    throw new Error("no canvas!!!");
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
    while (_animating) {
      window?.requestAnimationFrame(() => {
        _actors.forEach((x) => x.draw());
      });
      updateFrame();
    }
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

  function start() {
    _animating = true;
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

export default DisplayController;

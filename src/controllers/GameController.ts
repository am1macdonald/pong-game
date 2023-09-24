import { DisplayController } from "./DisplayController.ts";

const GameController = (() => {
  let _displayController: DisplayController;
  const score: [number, number] = [0, 0];

  function setDisplayController(controller: DisplayController) {
    _displayController = controller;
  }

  function initialize() {
    if (!_displayController) {
      throw new Error("No display controller!");
    }
  }

  function updateScore() {}

  return {
    setDisplayController,
    initialize,
  };
})();

export default GameController;

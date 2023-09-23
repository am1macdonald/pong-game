import { DisplayController } from "./DisplayController.ts";

const GameController = (() => {
  let _displayController: DisplayController;

  function setDisplayController(controller: DisplayController) {
    _displayController = controller;
  }

  function initialize() {
    if (!_displayController) {
      throw new Error("No display controller!");
    }
  }

  return {
    setDisplayController,
    initialize,
  };
})();

export default GameController;

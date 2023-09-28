import { DisplayController } from "./DisplayController.ts";
import { Observable } from "../types/Observable.ts";

export enum Players {
  one,
  two,
}

const GameController = (() => {
  let _displayController: DisplayController;
  const score: [number, number] = [0, 0];
  let scoreSubscription: Observable;

  function setDisplayController(controller: DisplayController) {
    _displayController = controller;
  }

  function initialize(sub: Observable) {
    if (!_displayController) {
      throw new Error("No display controller!");
    }
    scoreSubscription = sub;
    scoreSubscription.subscribe({ self: GameController, next: updateScore });
  }

  function destroy() {
    scoreSubscription.unsubscribe({ self: GameController, next: updateScore });
  }

  function updateScore(player: Players) {
    score[player]++;
    console.log(score);
  }

  return {
    setDisplayController,
    initialize,
  };
})();

export default GameController;

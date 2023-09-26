import { Command, Controllable } from "../types/types.ts";
import { makeChangePaddleDirectionCommand, PaddleDirection } from "../Models/actors/Paddles.ts";

export type KeyCode = string;

export type Binding = {
  up: KeyCode;
  down: KeyCode;
};

const inputController = (() => {
  const actors: Controllable[] = [];
  const bindings: Binding[] = [];
  const listenerCallbacks: Record<string, () => void>[] = [];
  function updateListeners() {
    bindings.forEach((binding, index) => {
      const listenerCallback = {
        keydown: createListener(binding, actors[index], "keydown"),
        keyup: createListener(binding, actors[index], "keyup"),
      };
      window.addEventListener("keydown", listenerCallback.keydown);
      window.addEventListener("keyup", listenerCallback.keyup);
    });
  }
  function createListener(binding: Binding, actor: Controllable, keyStroke: "keyup" | "keydown") {
    if (keyStroke === "keyup") {
      return ({ code }: KeyboardEvent) => {
        if (binding.up === code || binding.down === code) {
          console.log(code);
          const command: Command<PaddleDirection, PaddleDirection, PaddleDirection> =
            makeChangePaddleDirectionCommand(0);
          actor.execute(command);
        }
      };
    } else if (keyStroke === "keydown") {
      return ({ code }: KeyboardEvent) => {
        console.log("keydown", code);
        if (binding.up === code) {
          const command: Command<PaddleDirection, PaddleDirection, PaddleDirection> =
            makeChangePaddleDirectionCommand(-1);
          actor.execute(command);
        } else if (binding.down === code) {
          const command: Command<PaddleDirection, PaddleDirection, PaddleDirection> =
            makeChangePaddleDirectionCommand(1);
          actor.execute(command);
        }
      };
    } else throw new Error("unknown keystroke");
  }
  function destroyListeners() {
    listenerCallbacks.forEach((cb) => {
      Object.keys(cb).forEach((key) => {
        window.removeEventListener(key, cb[key]);
      });
    });
  }
  return {
    registerActor: (actor: Controllable, binding: Binding) => {
      actors.push(actor);
      bindings[actors.length - 1] = binding;
      updateListeners();
    },
    reset: () => {
      while (actors.length > 0) {
        actors.pop();
      }
      while (bindings.length > 0) {
        bindings.pop();
      }
      destroyListeners();
      while (listenerCallbacks.length > 0) {
        listenerCallbacks.pop();
      }
    },
  };
})();

export default inputController;

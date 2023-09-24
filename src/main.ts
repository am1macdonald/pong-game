import "./reset.css";
import "./style.css";
import displayController from "./controllers/DisplayController.ts";
import PongBall from "./actors/PongBall.ts";
import gameController from "./controllers/GameController.ts";
import Paddle from "./actors/Paddles.ts";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) throw new Error("No app");

const paddleLeft = Paddle("left");
const paddleRight = Paddle("right");
let running = false;

// init display controller
displayController.attachToView(app);
displayController.registerActors([PongBall, paddleLeft, paddleRight]);

// init game controller;
gameController.setDisplayController(displayController);

window.addEventListener("keydown", (evt) => {
  console.log(evt);
  if (evt.key === " ") {
    if (running) {
      displayController.stop();
    } else {
      displayController.start();
    }
    running = !running;
  }
});

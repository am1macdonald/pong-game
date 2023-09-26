import "./reset.css";
import "./style.css";
import displayController from "./controllers/DisplayController.ts";
import PongBall from "./Models/actors/PongBall.ts";
import gameController from "./controllers/GameController.ts";
import Paddle from "./Models/actors/Paddles.ts";
import inputController from "./controllers/InputController.ts";
import InputController from "./controllers/InputController.ts";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) throw new Error("No app");

const paddleLeft = Paddle("left", "player");
const paddleRight = Paddle("right", "computer");
const running = false;

// init display controller
displayController.attachToView(app);
displayController.registerActors([PongBall, paddleLeft, paddleRight]);

// init input controller
InputController.registerActor(paddleLeft, { down: "KeyR", up: "KeyW" });

// init game controller;
gameController.setDisplayController(displayController);

displayController.start();
console.log(inputController);

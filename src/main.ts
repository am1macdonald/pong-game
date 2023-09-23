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

// init display controller
displayController.attachToView(app);
displayController.registerActors([PongBall, paddleLeft, paddleRight]);
displayController.start();

// init game controller;
gameController.setDisplayController(displayController);

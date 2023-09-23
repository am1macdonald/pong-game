import "./reset.css";
import "./style.css";
import DisplayController from "./DisplayController.ts";
import displayController from "./controllers/DisplayController.ts";
import PongBall from "./actors/PongBall.ts";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) throw new Error("No app");

DisplayController.attachToView(app);
// init display controller
displayController.attachToView(app);
displayController.registerActors([PongBall, paddleLeft, paddleRight]);
displayController.start();

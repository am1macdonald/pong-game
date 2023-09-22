import "./reset.css";
import "./style.css";
import DisplayController from "./DisplayController.ts";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) throw new Error("No app");

DisplayController.attachToView(app);

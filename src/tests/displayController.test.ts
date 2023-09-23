// @vitest-environment jsdom
import displayController from "../controllers/DisplayController.ts";
import { describe, expect, test } from "vitest";

describe("Display Controller", () => {
  test("canvas attaches properly", () => {
    const dom = getDom({ height: 300, width: 400 });
    displayController.attachToView(dom);
    const canvas = dom.firstElementChild as HTMLCanvasElement;
    expect(canvas).toBeTruthy();
  });

  test("canvas always fits dom 4:3", () => {
    const dom = getDom({ height: 300, width: 400 });
    displayController.attachToView(dom);
    const canvas = dom.firstElementChild as HTMLCanvasElement;
    console.log(canvas.getContext("2d"));

    expect(canvas.clientWidth).toBeLessThanOrEqual(dom.clientWidth);
    expect(canvas.clientHeight).toBeLessThanOrEqual(dom.clientHeight);
  });

  test("canvas always fits dom 3:4", () => {
    const dom = getDom({ height: 400, width: 300 });
    displayController.attachToView(dom);
    const canvas = dom.firstElementChild as HTMLCanvasElement;

    expect(canvas.clientWidth).toBeLessThanOrEqual(dom.clientWidth);
    expect(canvas.clientHeight).toBeLessThanOrEqual(dom.clientHeight);
  });

  test("canvas always fits dom", () => {
    const dom = getDom({ height: Math.random() * 1000, width: Math.random() * 1000 });
    displayController.attachToView(dom);
    const canvas = dom.firstElementChild as HTMLCanvasElement;

    expect(canvas.clientWidth).toBeLessThanOrEqual(dom.clientWidth);
    expect(canvas.clientHeight).toBeLessThanOrEqual(dom.clientHeight);
  });

  function getDom({ height, width }: { height: number; width: number }) {
    const DOM = document.createElement("div");
    DOM.style.width = width.toString() + "px";
    DOM.style.height = height.toString() + "px";
    return DOM;
  }
});

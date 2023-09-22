// @vitest-environment jsdom
import DisplayController from "../DisplayController.ts";
import { describe, expect, test } from "vitest";

describe("Display Controller", () => {
  test("canvas attaches properly", () => {
    const dom = getDom({ height: 300, width: 400 });
    DisplayController.attachToView(dom);
    const canvas = dom.firstElementChild as HTMLCanvasElement;
    expect(canvas).toBeTruthy();
  });

  test("canvas always fits dom 4:3", () => {
    const dom = getDom({ height: 300, width: 400 });
    DisplayController.attachToView(dom);
    const canvas = dom.firstElementChild as HTMLCanvasElement;
    console.log(canvas.getContext("2d"));

    expect(canvas.clientWidth).toBeLessThanOrEqual(dom.clientWidth);
    expect(canvas.clientHeight).toBeLessThanOrEqual(dom.clientHeight);
  });

  test("canvas always fits dom 3:4", () => {
    const dom = getDom({ height: 400, width: 300 });
    DisplayController.attachToView(dom);
    const canvas = dom.firstElementChild as HTMLCanvasElement;

    expect(canvas.clientWidth).toBeLessThanOrEqual(dom.clientWidth);
    expect(canvas.clientHeight).toBeLessThanOrEqual(dom.clientHeight);
  });

  test("canvas always fits dom", () => {
    const dom = getDom({ height: Math.random() * 1000, width: Math.random() * 1000 });
    DisplayController.attachToView(dom);
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

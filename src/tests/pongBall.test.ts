// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import PongBall from "../Models/actors/PongBall.ts";

describe("Pong Ball Actor", () => {
  test("it instantiates", () => {
    expect(PongBall).toBeTruthy();
  });
});

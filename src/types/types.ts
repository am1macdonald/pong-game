import { Vertex } from "./Actor.ts";
import { PaddleDirection } from "../Models/actors/Paddles.ts";

export type Dimensions = { height: number; width: number };

export type Coordinate = { x: number; y: number };

export type Edge = [Vertex, Vertex];

export interface Command<A, B, C> {
  execute: (...args: A[]) => B;
  value: C;
}

export interface Controllable {
  execute: (command: Command<PaddleDirection, PaddleDirection, PaddleDirection>) => void;
}

import { Vertex } from "./Actor.ts";

export type Dimensions = { height: number; width: number };

export type Coordinate = { x: number; y: number };

export type Edge = [Vertex, Vertex];

export type Command = (execute: (...args: unknown[]) => unknown, value: unknown) => void;

export interface Controllable {
  execute: (command: Command) => void;
}

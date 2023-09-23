export type xCoord = number;
export type yCoord = number;
export type Vertex = [xCoord, yCoord];

export interface Actor {
  draw: () => void;
  setCanvas: (canvas: HTMLCanvasElement) => void;
  setCtx: (ctx: CanvasRenderingContext2D) => void;
  getVertices: () => Array<Vertex>;
  setActors: (actors: Array<Actor>) => void;
}

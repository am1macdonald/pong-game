export interface Actor {
  draw: () => void;
  setCanvas: (canvas: HTMLCanvasElement) => void;
  setCtx: (ctx: CanvasRenderingContext2D) => void;
}

declare module 'delatin' {
  export default class Delatin {
    constructor(
      data: number[],
      width: number, height?: number
    );

    width: number;
    height: number;
    coords: number[];
    triangles: number[];

    run(maxError: number): void;
    refine(): void;
    getMaxError(): number;
    getRMSD(): number;
    heightAt(x: number, y: number): number;
  }
}

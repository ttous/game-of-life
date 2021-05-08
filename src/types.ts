export type World = Bit[][];
export type Point = [number, number];
export type Bit = 0 | 1;
export type Population = {
  points: Point[];
  position: Point;
};
export type Dimensions = {
  width: number;
  height: number;
};

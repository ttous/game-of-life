import { Bit, Dimensions, Point, Population, World } from "types";

/** WORLD */
export const initWorld = (size: number, populations: Population[]): World =>
  addPopulations(createWorld(size), populations);

export const initRandomWorld = (size: number, lifeProb: number = 0.1): World =>
  createWorld(size).map((row) =>
    row.map(() => (Math.random() < lifeProb ? 1 : 0))
  );

export const createWorld = (size: number): World =>
  Array(size).fill(Array(size).fill(0));

export const addPopulations = (
  world: World,
  populations: Population[]
): World => {
  const points = populations.flatMap(({ points, position }) =>
    movePoints(points, position)
  );
  return addPoints(world, points);
};

export const addPointsAt = (
  world: World,
  points: Point[],
  position: Point
): World => addPoints(world, movePoints(points, position));

export const addPoints = (world: World, points: Point[]): World =>
  world.map((row, y) =>
    row.map((cell, x) =>
      points.some(([x2, y2]) => x === x2 && y === y2) ? 1 : cell
    )
  );

export const ageWorld = (world: World): World =>
  world.map((row, y) => row.map((cell, x) => ageCell(world, [x, y])));

export const ageCell = (world: World, [x, y]: Point): Bit => {
  const neighbourCount = getNeighbourCount(world, [x, y]);
  return world[y][x]
    ? neighbourCount === 2 || neighbourCount === 3
      ? 1
      : 0
    : neighbourCount === 3
    ? 1
    : 0;
};

export const getNeighbourCount = (world: World, [x, y]: Point): number =>
  getCellCount(getNeighbourhood(world, [x, y])) - world[y][x];

export const getNeighbourhood = (world: World, [x, y]: Point): World =>
  world
    .slice(Math.max(y - 1, 0), Math.min(y + 2, world.length - 1))
    .map((row) =>
      row.slice(Math.max(x - 1, 0), Math.min(x + 2, world[0].length - 1))
    );

export const getCellCount = (world: World): number =>
  world.reduce(
    (prevRowCount, currRow) =>
      prevRowCount +
      currRow.reduce<number>(
        (prevCellCount, currCell) => prevCellCount + currCell,
        0
      ),
    0
  );

/** POINTS */
export const normalizePoints = (points: Point[]) => {
  const [xOffset, yOffset] = getOffset(points);
  return points.map(([x, y]) => [x + Math.round(xOffset), y + Math.round(yOffset)]);
};

export const movePoints = (points: Point[], [posX, posY]: Point): Point[] => {
  const [xOffset, yOffset] = getOffset(points);
  return points.map(([x, y]) => [x + posX - Math.round(xOffset), y + posY - Math.round(yOffset)]);
};

export const getHorizontalMirror = (points: Point[]): Point[] => {
  const [xOffset, _] = getOffset(points);
  return points.map(([x, y]) => [2 * xOffset - x, y]);
};

export const getVerticalMirror = (points: Point[]): Point[] => {
  const [_, yOffset] = getOffset(points);
  return points.map(([x, y]) => [x, 2 * yOffset - y]);
};

export const getDimensions = (points: Point[]): Dimensions => ({
  width: getWidth(points),
  height: getHeight(points),
});

export const getWidth = (points: Point[]): number => {
  const [[minX, maxX], _] = getMinAndMax(points);
  return maxX - minX + 1;
};

export const getHeight = (points: Point[]): number => {
  const [_, [minY, maxY]] = getMinAndMax(points);
  return maxY - minY + 1;
};

/** Offsets are muiltiple of 0.5, so they can be floating point numbers. */
export const getOffset = (points: Point[]): [number, number] => {
  const [[minX, maxX], [minY, maxY]] = getMinAndMax(points);
  return [(minX + maxX) / 2, (minY + maxY) / 2];
};

export const getMinAndMax = (
  points: Point[]
): [[number, number], [number, number]] => {
  const xValues = points.map(([x, y]) => x);
  const yValues = points.map(([x, y]) => y);
  return [
    [Math.min(...xValues), Math.max(...xValues)],
    [Math.min(...yValues), Math.max(...yValues)],
  ];
};

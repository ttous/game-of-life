import { Point, World } from "types";
import * as utils from "./utils";

describe("utils", () => {
  describe("getNeighbourCount", () => {
    let world: World;
    let point: Point;

    describe("when there is no neighbours", () => {
      beforeEach(() => {
        world = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];
        point = [2, 2];
      });

      it("should return 0", () => {
        const result = utils.getNeighbourCount(world, point);
        expect(result).toBe(0);
      });
    });

    describe("when there is 1 neighbour in a corner", () => {
      beforeEach(() => {
        world = [
          [0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];
        point = [2, 2];
      });

      it("should return 1", () => {
        const result = utils.getNeighbourCount(world, point);
        expect(result).toBe(1);
      });
    });

    describe("when there is 1 neighbour in an edge", () => {
      beforeEach(() => {
        world = [
          [0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ];
        point = [2, 2];
      });

      it("should return 1", () => {
        const result = utils.getNeighbourCount(world, point);
        expect(result).toBe(1);
      });
    });

    describe("when there are 2 opposite neighbours", () => {
      beforeEach(() => {
        world = [
          [0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0],
          [0, 0, 0, 0, 0],
        ];
        point = [2, 2];
      });

      it("should return 2", () => {
        const result = utils.getNeighbourCount(world, point);
        expect(result).toBe(2);
      });
    });

    describe("when there are 3 neighbours", () => {
      beforeEach(() => {
        world = [
          [0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 0, 0, 1, 0],
          [0, 0, 0, 1, 0],
          [0, 0, 0, 0, 0],
        ];
        point = [2, 2];
      });

      it("should return 3", () => {
        const result = utils.getNeighbourCount(world, point);
        expect(result).toBe(3);
      });
    });

    // TODO Test corners
  });
});

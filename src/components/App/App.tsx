import { colors, makeStyles, fade } from "@material-ui/core";
import { WORLD_SIZE } from "common";
import {
  ageWorld,
  getCellCount,
  getHorizontalMirror,
  getVerticalMirror,
  initWorld
} from "components/App/utils";
import { Cell } from "components/Cell";
import { Row } from "components/Row";
import { planerCanon } from "patterns";
import React, { useEffect, useState } from "react";
import { Bit, Population } from "types";

export const App = () => {
  const classes = useStyles();

  const [world, setWorld] = useState<Bit[][]>(
    initWorld(WORLD_SIZE, INITIAL_POPULATIONS)
  );
  const [generationCount, setGenerationCount] = useState<number>(1);
  const [generationTime] = useState<number>(INITIAL_GENERATION_TIME);
  const [cellCount, setCellCount] = useState<number>();

  // setCellCount
  useEffect(() => {
    setCellCount(getCellCount(world));
  }, [world]);

  // setWorld
  useEffect(() => {
    const handleAge = () => {
      setWorld((prevWorld) => ageWorld(prevWorld));
      setGenerationCount((prev) => prev + 1);
    };
    const ageInterval = setInterval(handleAge, generationTime * 1000);
    return () => clearInterval(ageInterval);
  }, [generationCount, generationTime]);

  return (
    <>
      <div className={classes.labels}>
        <div>
          <span>
            {"Generation: "}
            {generationCount}
          </span>
        </div>
        <div>
          <span>
            {"Cell count: "}
            {cellCount}
          </span>
        </div>
      </div>
      <div className={classes.root}>
        {world.map((row, yIndex) => (
          <Row key={yIndex}>
            {row.map((cell, xIndex) => (
              <Cell key={xIndex} alive={cell === 1} />
            ))}
          </Row>
        ))}
      </div>
    </>
  );
};

const INITIAL_GENERATION_TIME: number = 0.1; // in seconds.
const INITIAL_POPULATIONS: Population[] = [
  { points: planerCanon, position: [20, 20] },
  { points: getHorizontalMirror(planerCanon), position: [80, 20] },
  { points: getVerticalMirror(planerCanon), position: [20, 79] },
  { points: getVerticalMirror(getHorizontalMirror(planerCanon)), position: [80, 79] },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
  labels: {
    position: "absolute",
    top: theme.spacing(4),
    left: theme.spacing(4),
    padding: theme.spacing(1),
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.grey[500],
    backgroundColor: fade(colors.grey[500], 0.1),
    color: colors.red[500],

  },
  "@global": {
    body: {
      backgroundColor: "black",
    },
  },
}));

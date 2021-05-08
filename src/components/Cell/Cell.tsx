import { makeStyles } from "@material-ui/core";
import { CELL_SIZE } from "common";

type CellProps = {
  alive: boolean;
};

export const Cell: React.FC<CellProps> = ({ children, alive }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.cell}
      style={alive ? { backgroundColor: "white" } : undefined}
    >
      {children}
    </div>
  );
};

const useStyles = makeStyles({
  cell: {
    width: CELL_SIZE,
    height: "100%",
  },
});

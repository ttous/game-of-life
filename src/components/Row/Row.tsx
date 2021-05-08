import { makeStyles } from "@material-ui/core";
import { CELL_SIZE } from "common";

export const Row: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.row}>{children}</div>;
};

const useStyles = makeStyles({
  row: {
    height: CELL_SIZE,
    display: "flex",
    flexDirection: "row",
  },
});

import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core";
import { grey, red } from "@material-ui/core/colors";
import React from "react";

export const ThemeProvider: React.FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: red[900],
    },
    secondary: {
      main: grey[700],
    },
  },
});

import React from "react";

import { ThemeProvider } from "@material-ui/styles";

// routes
import Routes from "./routes";

// styles
import { theme } from "./styles/theme";
import "./styles/css/App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;

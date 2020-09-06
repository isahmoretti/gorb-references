import React from "react";

import { ThemeProvider } from "@material-ui/styles";

import GlobalStyles from "./styles/GlobalStyles";

// routes
import Routes from "./routes";

// styles
import { theme } from "./styles/theme";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;

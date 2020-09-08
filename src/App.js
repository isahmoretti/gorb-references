import React from "react";

import { ThemeProvider } from "@material-ui/styles";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import storeRedux from "./store";

import GlobalStyles from "./styles/GlobalStyles";

// routes
import Routes from "./routes";

// styles
import { theme } from "./styles/theme";
import "./styles/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function App() {
  const { persistor, store } = storeRedux();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Routes />
          <GlobalStyles />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

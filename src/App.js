import React from "react";

// views
import Book from "./views/book";
import Dashboard from "./views/Dashboard";

// styles
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <div>
      <Dashboard />
      <Book/>
      <GlobalStyles />
    </div>
  );
}

export default App;

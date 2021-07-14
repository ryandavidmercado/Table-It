import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ColorModeScript } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ColorModeScript />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

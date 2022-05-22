import React from "react";
import ReactDOM from "react-dom";
import "../src/css/style.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import UserContextProver from './context'

ReactDOM.render(
  <BrowserRouter>
    <UserContextProver>
      <App />
    </UserContextProver>
  </BrowserRouter>,
  document.getElementById("root")
);

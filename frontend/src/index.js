import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import reducer, { initialState } from "./Reducer";
import { StateProvider } from "./StateProvider";
import "./styleCss/index.css";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

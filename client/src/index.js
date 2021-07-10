import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import store from "./components/store";
import { Provider } from "react-redux";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";
import AlertTemplate from "react-alert-template-basic";
// import { options } from "../../backend/routes/userRouter";
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);

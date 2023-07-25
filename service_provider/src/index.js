import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "font-awesome/css/font-awesome.min.css";
import { Provider } from "react-redux/es";
import store from "./Store/index";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);

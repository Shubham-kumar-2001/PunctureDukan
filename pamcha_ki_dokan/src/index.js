import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "font-awesome/css/font-awesome.min.css";
import { Provider } from "react-redux";
import store from "./Store";
import "react-toastify/dist/ReactToastify.css";
import { AuthContexProvider } from "./Store/AuthContextProvider";
// import("dotenv").config();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthContexProvider>
      <App />
    </AuthContexProvider>
  </Provider>
);

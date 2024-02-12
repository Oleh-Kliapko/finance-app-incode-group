import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "@/components/ErrorBoundary";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./redux/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
    <ToastContainer position="bottom-right" />
  </Provider>
  // </React.StrictMode>
);

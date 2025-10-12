import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux_toolkit/store/store";
import "./index.css";
import App from "./App";

if (import.meta.env.VITE_NODE_ENV === "DEV") {
  async function mod() {
    const { worker } = await import("./mock_api/browser");
    worker.start();
  }
  mod();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

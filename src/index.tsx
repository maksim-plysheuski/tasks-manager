import React from "react";
import "index.scss";
import App from "./app/App";
import {Provider} from "react-redux";
import {store} from "app/store";
import {createRoot} from "react-dom/client";


const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

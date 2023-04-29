import React from "react";
import "index.scss";
import { App } from "app/App";
import {Provider} from "react-redux";
import {createRoot} from "react-dom/client";
import {store} from "app/store";




const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

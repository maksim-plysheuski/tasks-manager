import React from "react";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./app/App";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

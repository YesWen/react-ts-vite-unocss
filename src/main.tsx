import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "uno.css";
import "reset.css";
import "@/assets/style/index.scss";
import { Provider } from "react-redux";
import { store } from "./store";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

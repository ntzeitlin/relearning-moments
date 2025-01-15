import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
    <Theme>
        <App />
    </Theme>
);

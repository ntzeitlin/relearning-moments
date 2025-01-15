import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
        <Theme accentColor="yellow" grayColor="olive" appearance="dark">
            <App />
            {/* <ThemePanel /> */}
        </Theme>
    </BrowserRouter>
);

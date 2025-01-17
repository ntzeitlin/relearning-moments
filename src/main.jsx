import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { Login } from "./components/auth/Login";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { BrowserRouter, Route } from "react-router-dom";
import { Register } from "./components/auth/Register.jsx";
import { ApplicationViews } from "./views/ApplicationViews.jsx";
import { Authorized } from "./views/Authorized.jsx";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
        {/* <Theme accentColor="yellow" grayColor="olive" appearance="dark"> */}
        <App />
        {/* <ThemePanel /> */}
        {/* </Theme> */}
    </BrowserRouter>
);

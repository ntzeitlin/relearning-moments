import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Theme } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export const App = () => {
    const [displayMode, setDisplayMode] = useState("dark");
    useEffect(() => {
        setDisplayMode(displayMode);
    }, [displayMode]);

    return (
        <Theme accentColor="yellow" grayColor="olive" appearance={displayMode}>
            <>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="*"
                        element={
                            <Authorized>
                                <ApplicationViews
                                    setDisplayMode={setDisplayMode}
                                />
                            </Authorized>
                        }
                    />
                </Routes>
            </>
        </Theme>
    );
};

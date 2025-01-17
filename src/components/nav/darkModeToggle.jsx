import { Switch } from "@radix-ui/themes";
import { useState } from "react";

export const DarkModeSwitch = ({ setDisplayMode }) => {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => {
        if (darkMode) {
            setDisplayMode("light");
        } else {
            setDisplayMode("dark");
        }
        setDarkMode(!darkMode);
        // window.location.reload(true);
    };

    return <Switch onCheckedChange={toggleDarkMode} />;
};

import { TabNav } from "@radix-ui/themes";
import { Link, useLocation } from "react-router-dom";
export const NavBar = () => {
    const location = useLocation();
    return (
        <TabNav.Root justify="center">
            <TabNav.Link asChild active={location.pathname === "/"}>
                <Link href="/">All Posts</Link>
            </TabNav.Link>
            <TabNav.Link asChild active={location.pathname === ""}>
                <Link href="/">My Posts</Link>
            </TabNav.Link>
            <TabNav.Link asChild active={location.pathname === ""}>
                <Link href="/">Favorite Posts</Link>
            </TabNav.Link>
            <TabNav.Link asChild active={location.pathname === ""}>
                <Link href="/">New Posts</Link>
            </TabNav.Link>
            <TabNav.Link asChild active={location.pathname === ""}>
                <Link href="/">Profile</Link>
            </TabNav.Link>
            <TabNav.Link asChild active={location.pathname === ""}>
                <Link href="/">Logout</Link>
            </TabNav.Link>
        </TabNav.Root>
    );
};

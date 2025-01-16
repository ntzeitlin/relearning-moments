import { TabNav } from "@radix-ui/themes";
import { Link, useLocation, useNavigate } from "react-router-dom";
export const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <TabNav.Root justify="center">
            <TabNav.Link asChild active={location.pathname === "/"}>
                <Link to="/">All Posts</Link>
            </TabNav.Link>
            <TabNav.Link asChild active={location.pathname === "/post/mine"}>
                <Link to="/post/mine" state={{ showmyposts: true }}>
                    My Posts
                </Link>
            </TabNav.Link>
            <TabNav.Link
                asChild
                active={location.pathname === "/post/favorite"}
            >
                <Link to="/post/favorite" state={{ showfavorites: true }}>
                    Favorite Posts
                </Link>
            </TabNav.Link>
            <TabNav.Link asChild active={location.pathname === ""}>
                <Link href="/">New Posts</Link>
            </TabNav.Link>
            <TabNav.Link asChild active={location.pathname === ""}>
                <Link href="/">Profile</Link>
            </TabNav.Link>
            <TabNav.Link asChild active={location.pathname === ""}>
                {localStorage.getItem("learning_user") ? (
                    <Link
                        to=""
                        onClick={() => {
                            localStorage.removeItem("learning_user");
                            navigate("/login", { replace: true });
                        }}
                    >
                        Logout
                    </Link>
                ) : (
                    ""
                )}
            </TabNav.Link>
        </TabNav.Root>
    );
};

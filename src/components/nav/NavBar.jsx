import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import "./NavBar.css";
export const NavBar = () => {
    const handleClick = () => {
        console.log("clicked");
    };
    return (
        <NavigationMenu.Root className="NavigationMenuRoot">
            <NavigationMenu.Item>
                <NavigationMenu.Link
                    className="NavigationMenuLink"
                    onClick={handleClick}
                >
                    All Posts
                </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
                <NavigationMenu.Link className="NavigationMenuLink">
                    My Posts
                </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
                <NavigationMenu.Link className="NavigationMenuLink">
                    Fav Posts
                </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
                <NavigationMenu.Link className="NavigationMenuLink">
                    New Post
                </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
                <NavigationMenu.Link className="NavigationMenuLink">
                    Profile
                </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
                <NavigationMenu.Link className="NavigationMenuLink">
                    Logout
                </NavigationMenu.Link>
            </NavigationMenu.Item>
        </NavigationMenu.Root>
    );
};

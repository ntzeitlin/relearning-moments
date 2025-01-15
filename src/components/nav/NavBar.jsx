import { TabNav } from "@radix-ui/themes";
export const NavBar = () => {
    return (
        <TabNav.Root justify="center">
            <TabNav.Link href="#" active>
                All Posts
            </TabNav.Link>
            <TabNav.Link href="#">My Posts</TabNav.Link>
            <TabNav.Link href="#">Favorite Posts</TabNav.Link>
            <TabNav.Link href="#">New Post</TabNav.Link>
            <TabNav.Link href="#">Profile</TabNav.Link>
            <TabNav.Link href="#">Logout</TabNav.Link>
        </TabNav.Root>
    );
};

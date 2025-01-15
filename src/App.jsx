import { Flex, Section } from "@radix-ui/themes";
import { TopicSelect } from "./components/filter/TopicSelect";
import { NavBar } from "./components/Nav/NavBar";
import { AllPosts } from "./components/views/AllPosts";
import { SearchBox } from "./components/filter/SearchBox";

export const App = () => {
    return (
        <>
            <NavBar />
            <Section>
                <Flex justify="center" align="center">
                    <SearchBox />
                    <TopicSelect />
                </Flex>
            </Section>
            <AllPosts />
        </>
    );
};

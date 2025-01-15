import { TopicSelect } from "./components/filter/TopicSelect";
import { NavBar } from "./components/Nav/NavBar";
import { AllPosts } from "./components/views/AllPosts";

export const App = () => {
    return (
        <>
            <NavBar />
            <TopicSelect />
            <AllPosts />
        </>
    );
};

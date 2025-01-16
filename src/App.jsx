import { Flex, Section } from "@radix-ui/themes";
import { TopicSelect } from "./components/filter/TopicSelect";
import { NavBar } from "./components/Nav/NavBar";
import { AllPosts } from "./components/views/AllPosts";
import { SearchBox } from "./components/filter/SearchBox";
import { useState, useEffect } from "react";
import { getAllPosts } from "./services/postService";

export const App = () => {
    const [topicId, setTopicId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [allPostsArray, setAllPostsArray] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        getAndSetAllPosts();
    }, []);

    useEffect(() => {
        setFilteredPosts(allPostsArray);
    }, [allPostsArray]);

    useEffect(() => {
        filterPosts(searchTerm, topicId);
    }, [searchTerm, topicId]);

    const getAndSetAllPosts = () => {
        getAllPosts().then((response) => setAllPostsArray(response));
    };

    const filterPosts = (searchTerm = "", topicId = "") => {
        let filteringPosts = [];

        if (topicId) {
            filteringPosts = allPostsArray.filter(
                (postObject) => postObject.topicId == topicId
            );
            setFilteredPosts(filteringPosts);
        } else if (topicId === 0) {
            setFilteredPosts(allPostsArray);
        }
        if (searchTerm) {
            filteringPosts = allPostsArray.filter((postObject) =>
                postObject.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
            setFilteredPosts(filteringPosts);
        }
    };

    return (
        <>
            <NavBar />
            <Section>
                <Flex justify="center" align="center">
                    <SearchBox setSearchTerm={setSearchTerm} />
                    <TopicSelect
                        setTopicId={setTopicId}
                        getAndSetAllPosts={getAndSetAllPosts}
                    />
                </Flex>
            </Section>
            <AllPosts filteredPosts={filteredPosts} />
        </>
    );
};

import { Route, Routes } from "react-router-dom";
import { AllPosts } from "../components/views/AllPosts";
import { NavBar } from "../components/Nav/NavBar";
import { Flex, Section } from "@radix-ui/themes";
import { SearchBox } from "../components/filter/SearchBox";
import { TopicSelect } from "../components/filter/TopicSelect";
import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { FilterBar } from "../components/filter/FilterBar";

export const ApplicationViews = () => {
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
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <FilterBar
                            setSearchTerm={setSearchTerm}
                            setTopicId={setTopicId}
                            getAndSetAllPosts={getAndSetAllPosts}
                        />
                        <AllPosts filteredPosts={filteredPosts} />
                    </>
                }
            >
                <Route index element={<AllPosts />} />
            </Route>
        </Routes>
    );
};

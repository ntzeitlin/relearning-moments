import { Outlet, Route, Routes } from "react-router-dom";
import { AllPosts } from "../components/posts/AllPosts";
import { NavBar } from "../components/Nav/NavBar";
import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { FilterBar } from "../components/filter/FilterBar";
import { Post } from "../components/posts/Post";
import { ManagePost } from "../components/form/ManagePost";

export const ApplicationViews = () => {
    const [topicId, setTopicId] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [allPostsArray, setAllPostsArray] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user");
        const learningUserObject = JSON.parse(localLearningUser);
        setCurrentUser(learningUserObject);
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
                            topicId={topicId}
                        />
                        <Outlet />
                    </>
                }
            >
                <Route
                    index
                    element={
                        <AllPosts
                            filteredPosts={filteredPosts}
                            viewName={"view--index--"}
                        />
                    }
                />
                <Route path="post">
                    <Route
                        index
                        element={
                            <AllPosts
                                filteredPosts={filteredPosts}
                                viewName={"view--post--"}
                            />
                        }
                    />
                    <Route
                        path=":postId"
                        element={
                            <Post
                                detailedView={true}
                                currentUser={currentUser}
                                getAndSetAllPosts={getAndSetAllPosts}
                            />
                        }
                    />

                    <Route
                        path="mine"
                        element={
                            <AllPosts
                                filteredPosts={filteredPosts}
                                currentUser={currentUser}
                                viewName={"view--mine--"}
                            />
                        }
                    />
                    <Route
                        path="favorite"
                        element={
                            <AllPosts
                                filteredPosts={filteredPosts}
                                currentUser={currentUser}
                                getAndSetAllPosts={getAndSetAllPosts}
                                viewName={"view--favorite--"}
                            />
                        }
                    />
                    <Route path="edit">
                        <Route
                            path=":postId"
                            element={
                                <ManagePost
                                    shouldEdit={true}
                                    getAndSetAllPosts={getAndSetAllPosts}
                                    currentUser={currentUser}
                                />
                            }
                        />
                    </Route>

                    <Route
                        path="new"
                        element={
                            <ManagePost
                                shouldEdit={false}
                                currentUser={currentUser}
                                getAndSetAllPosts={getAndSetAllPosts}
                            />
                        }
                    />
                </Route>
            </Route>
        </Routes>
    );
};

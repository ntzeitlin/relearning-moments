import { Container, Grid } from "@radix-ui/themes";
import { Post } from "../posts/Post";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const AllPosts = ({
    filteredPosts,
    currentUser = {},
    getAndSetAllPosts,
    viewName,
}) => {
    const [postArray, setPostArray] = useState([]);
    const location = useLocation();

    // When filteredPosts change, set local state to the filteredPosts.
    // then, check it see if showmyposts is true, if so, then get currentUser.id and filter the filteredPosts
    useEffect(() => {
        setPostArray(filteredPosts);

        if (location.state?.showmyposts) {
            const postArrayCopy = [...filteredPosts];
            setPostArray(
                postArrayCopy.filter(
                    (postObject) =>
                        parseInt(postObject.userId) === parseInt(currentUser.id)
                )
            );
        }

        if (location.state?.showfavorites) {
            const postArrayCopy = [...filteredPosts];
            setPostArray(
                postArrayCopy.filter(
                    (postObject) =>
                        postObject.userLikedPosts?.filter(
                            (postObject) =>
                                postObject.userId === parseInt(currentUser.id)
                        ).length > 0
                )
            );
        }
    }, [filteredPosts, location.state]);

    return (
        <Container size="4">
            <Grid columns="3">
                {postArray?.map((postObject) => {
                    return (
                        <Post
                            key={`${viewName}--${postObject.id}`}
                            postInfo={postObject}
                            detailedView={false}
                            currentUser={currentUser}
                            getAndSetAllPosts={getAndSetAllPosts}
                            showDislike={
                                location.state?.showfavorites ? true : false
                            }
                            viewName={viewName}
                        />
                    );
                })}
            </Grid>
        </Container>
    );
};

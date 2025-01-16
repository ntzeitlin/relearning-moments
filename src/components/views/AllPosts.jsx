import { Container, Grid } from "@radix-ui/themes";
import { Post } from "../posts/Post";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const AllPosts = ({ filteredPosts, currentUser = {} }) => {
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
            debugger;
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

    const checkForLikes = (userLikedPosts) => {
        for (const obj of userLikedPosts) {
            return obj.userId === parseInt(currentUser.id);
        }
    };

    return (
        <Container size="4">
            <Grid columns="3">
                {postArray?.map((postObject) => {
                    return (
                        <Post
                            key={`post-key-${postObject.id}`}
                            postInfo={postObject}
                            detailedView={false}
                        />
                    );
                })}
            </Grid>
        </Container>
    );
};

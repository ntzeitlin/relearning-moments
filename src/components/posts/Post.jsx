/* eslint-disable react/prop-types */
import { Box, Button, Card, Container, Heading } from "@radix-ui/themes";
import { Link, useParams } from "react-router-dom";
import { getPostById, handleLike } from "../../services/postService";
import { useEffect, useState } from "react";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";

export const Post = ({
    postInfo = {},
    detailedView,
    currentUser,
    getAndSetAllPosts,
}) => {
    // function to count likes
    // function to check if currentUser is the poster, if so add edit button, if not, add like button
    // check if post has been liked already, button based on this

    const { postId } = useParams();

    const [postData, setPostData] = useState({});

    useEffect(() => {
        setPostData(postInfo);
        if (detailedView) {
            getPostById(postId).then((data) => setPostData(data));
        }
    }, []);

    const checkIfLiked = () => {
        const alreadyLiked =
            postData.userLikedPosts?.filter(
                (likedPostObject) =>
                    parseInt(likedPostObject.userId) ===
                    parseInt(currentUser.id)
            ).length > 0;

        if (alreadyLiked) {
            return (
                <Button disabled>
                    <HeartFilledIcon />
                    Liked
                </Button>
            );
        } else {
            return (
                <Button
                    onClick={() => {
                        handleLike({
                            userId: currentUser.id,
                            postId: parseInt(postId),
                        });
                        getAndSetAllPosts();
                    }}
                >
                    <HeartIcon />
                    Like
                </Button>
            );
        }
    };

    return !detailedView ? (
        <Card size="2" m="3">
            <Heading size="4">
                <Link to={`/post/${postData.id}`}>{postData.title}</Link>
            </Heading>
            <Heading size="3" weight="medium">
                Topic: {postData.topic?.name}
            </Heading>
            <Heading size="2" weight="medium">
                Likes:{" "}
                {postData.userLikedPosts?.length
                    ? postInfo.userLikedPosts?.length
                    : "0"}
            </Heading>
        </Card>
    ) : (
        <Card size="2" m="3">
            <Heading size="4">{postData.title}</Heading>
            <Heading size="3">Author: {postData.user?.name}</Heading>
            <Heading size="3" weight="medium">
                Topic: {postData.topic?.name}
            </Heading>
            <Heading size="2" weight="medium">
                Likes:{" "}
                {postData.userLikedPosts?.length
                    ? postData.userLikedPosts?.length
                    : "0"}
            </Heading>
            <Heading size="1">Date: {postData.date}</Heading>
            <Box>{postData.body}</Box>
            <Container mt="2">
                {currentUser.id === postData.userId ? (
                    <Button>Edit</Button>
                ) : (
                    checkIfLiked()
                )}
            </Container>
        </Card>
    );
};

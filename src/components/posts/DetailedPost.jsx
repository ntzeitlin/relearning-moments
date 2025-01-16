/* eslint-disable react/prop-types */
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Container, Heading } from "@radix-ui/themes";
import { handleLike } from "../../services/postService";
import { useNavigate } from "react-router-dom";

export const DetailedPost = ({
    postData,
    getAndSetAllPosts,
    currentUser,
    postId,
}) => {
    const navigate = useNavigate();

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
                        navigate("/post/favorite", {
                            state: { showfavorites: true },
                        });
                    }}
                >
                    <HeartIcon />
                    Like
                </Button>
            );
        }
    };

    return (
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

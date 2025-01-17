/* eslint-disable react/prop-types */
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import {
    Box,
    Button,
    Card,
    Container,
    Heading,
    Section,
} from "@radix-ui/themes";
import { getPostById, handleLike } from "../../services/postService";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const DetailedPost = ({ getAndSetAllPosts, currentUser, postId }) => {
    const navigate = useNavigate();
    const [localPostData, setLocalPostData] = useState({});

    useEffect(() => {
        getPostById(postId).then((data) => setLocalPostData(data));
    }, []);

    const checkIfLiked = () => {
        const alreadyLiked =
            localPostData.userLikedPosts?.filter(
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
        <Container size="3" mt="5">
            <Card size="3" m="3">
                <Heading size="4">{localPostData?.title}</Heading>
                <Heading size="3">
                    Author:{" "}
                    <Link to={`/profile/${localPostData.userId}`}>
                        {localPostData.user?.name}
                    </Link>
                </Heading>
                <Heading size="3" weight="medium">
                    Topic: {localPostData.topic?.name}
                </Heading>
                <Heading size="2" weight="medium">
                    Likes:{" "}
                    {localPostData.userLikedPosts?.length
                        ? localPostData.userLikedPosts?.length
                        : "0"}
                </Heading>
                <Heading size="1">Date: {localPostData.date}</Heading>
                <Box>{localPostData.body}</Box>
                <Section mt="-7" mb="-8">
                    {currentUser.id === localPostData.userId ? (
                        <Button
                            onClick={() => {
                                navigate(`/post/edit/${postId}`);
                            }}
                        >
                            Edit
                        </Button>
                    ) : (
                        checkIfLiked()
                    )}
                </Section>
            </Card>
        </Container>
    );
};

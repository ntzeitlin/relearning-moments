/* eslint-disable react/prop-types */
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { Button, Card, Container, Heading } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import {
    deleteLikedPostById,
    deletePostByPostId,
    getLikedPostByUserIdAndPostId,
} from "../../services/postService";

export const SummaryPost = ({
    postData,
    showDislike,
    currentUser,
    getAndSetAllPosts,
    showDelete,
}) => {
    const handleUnlike = async () => {
        const likedPostId = await getLikedPostByUserIdAndPostId(
            parseInt(currentUser.id),
            parseInt(postData.id)
        );

        deleteLikedPostById(likedPostId[0].id);
        getAndSetAllPosts();
    };

    const handleDelete = () => {
        deletePostByPostId(postData.id);
        getAndSetAllPosts();
    };

    return (
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
                    ? postData.userLikedPosts?.length
                    : "0"}
            </Heading>
            {showDislike ? (
                <Container>
                    <Button size="1" mt="2" color="red" onClick={handleUnlike}>
                        <CircleBackslashIcon /> Unlike
                    </Button>
                </Container>
            ) : (
                ""
            )}
            {showDelete ? (
                <Container mt="3" mb="3">
                    <Button size="1" color="red" onClick={handleDelete}>
                        DELETE
                    </Button>
                </Container>
            ) : (
                ""
            )}
        </Card>
    );
};

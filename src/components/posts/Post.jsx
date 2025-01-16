/* eslint-disable react/prop-types */
import { Box, Button, Card, Container, Heading } from "@radix-ui/themes";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    deleteLikedPostById,
    getLikedPostByUserIdAndPostId,
    getPostById,
    handleLike,
} from "../../services/postService";
import { useEffect, useState } from "react";
import {
    CircleBackslashIcon,
    HeartFilledIcon,
    HeartIcon,
} from "@radix-ui/react-icons";
import { DetailedPost } from "./DetailedPost";

export const Post = ({
    postInfo = {},
    detailedView,
    currentUser,
    getAndSetAllPosts,
    showDislike = false,
}) => {
    // function to count likes
    // function to check if currentUser is the poster, if so add edit button, if not, add like button
    // check if post has been liked already, button based on this

    const { postId } = useParams();
    const navigate = useNavigate();

    const [postData, setPostData] = useState({});

    useEffect(() => {
        setPostData(postInfo);
        if (detailedView) {
            getPostById(postId).then((data) => setPostData(data));
        }
    }, []);

    // const checkIfLiked = () => {
    //     const alreadyLiked =
    //         postData.userLikedPosts?.filter(
    //             (likedPostObject) =>
    //                 parseInt(likedPostObject.userId) ===
    //                 parseInt(currentUser.id)
    //         ).length > 0;

    //     if (alreadyLiked) {
    //         return (
    //             <Button disabled>
    //                 <HeartFilledIcon />
    //                 Liked
    //             </Button>
    //         );
    //     } else {
    //         return (
    //             <Button
    //                 onClick={() => {
    //                     handleLike({
    //                         userId: currentUser.id,
    //                         postId: parseInt(postId),
    //                     });
    //                     getAndSetAllPosts();
    //                     navigate("/post/favorite", {
    //                         state: { showfavorites: true },
    //                     });
    //                 }}
    //             >
    //                 <HeartIcon />
    //                 Like
    //             </Button>
    //         );
    //     }
    // };

    const handleUnlike = async () => {
        const likedPostId = await getLikedPostByUserIdAndPostId(
            parseInt(currentUser.id),
            parseInt(postData.id)
        );

        deleteLikedPostById(likedPostId[0].id);
        getAndSetAllPosts();
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
            {showDislike ? (
                <Container>
                    <Button size="1" mt="2" color="red" onClick={handleUnlike}>
                        <CircleBackslashIcon /> Unlike
                    </Button>
                </Container>
            ) : (
                ""
            )}
        </Card>
    ) : (
        <DetailedPost
            postData={postData}
            getAndSetAllPosts={getAndSetAllPosts}
            currentUser={currentUser}
            postId={postId}
        />
    );
};

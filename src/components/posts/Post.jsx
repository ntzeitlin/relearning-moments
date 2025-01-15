import { Box, Card, Heading } from "@radix-ui/themes";

export const Post = ({ postInfo, detailedView = true }) => {
    // function to count likes
    // function to check if currentUser is the poster, if so add edit button, if not, add like button
    // check if post has been liked already, button based on this

    return !detailedView ? (
        <Card size="2" m="3">
            <Heading size="4">{postInfo.title}</Heading>
            <Heading size="3" weight="medium">
                Topic Id:{postInfo.topicId}
            </Heading>
            <Heading size="2" weight="medium">
                Likes: {}
            </Heading>
        </Card>
    ) : (
        <Card size="2" m="3">
            <Heading size="4">{postInfo.title}</Heading>
            <Heading size="3">UserId: {postInfo.userId}</Heading>
            <Heading size="3" weight="medium">
                Topic Id:{postInfo.topicId}
            </Heading>
            <Heading size="2" weight="medium">
                Likes: {}
            </Heading>
            <Heading size="1">Date: {postInfo.date}</Heading>
            <Box>{postInfo.body}</Box>
        </Card>
    );
};

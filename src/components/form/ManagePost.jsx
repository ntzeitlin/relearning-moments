import {
    Box,
    Button,
    Card,
    Container,
    Heading,
    Section,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePostById } from "../../services/postService";
import { TopicSelect } from "../filter/TopicSelect";

export const ManagePost = ({ shouldEdit, getAndSetAllPosts }) => {
    // Returns a New Post component or Edit Post component depending on the state that was passed in.

    const [localManagePostData, setLocalManagePostData] = useState({});
    const [topicId, setTopicId] = useState(0);

    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (shouldEdit) {
            getPostById(postId).then((data) => setLocalManagePostData(data));
            setTopicId(parseInt(localManagePostData.topicId));
        }
    }, []);

    // useEffect(() => {
    // }, [localManagePostData]);

    // useEffect(() => {
    //     const copyLocalData = { ...localManagePostData };
    //     copyLocalData.topicId = topicId;
    //     setLocalManagePostData(copyLocalData);
    // }, [topicId]);

    const handleSubmission = () => {
        const submissionObject = {
            userId: localManagePostData.userId,
            title: localManagePostData.title,
            body: localManagePostData.body,
            date: new Date(),
            topicId: topicId,
        };
        updatePostById(submissionObject, postId);
        getAndSetAllPosts();
        navigate(`/post/${postId}`);
    };

    return (
        <Container size="3">
            <Card size="3" m="3">
                <Heading size="4" m="1">
                    Title:
                    <TextField.Root
                        value={localManagePostData.title}
                        onChange={(event) => {
                            const postDataCopy = { ...localManagePostData };
                            postDataCopy.title = event.target.value;
                            setLocalManagePostData(postDataCopy);
                        }}
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                </Heading>
                <Heading size="3" m="1" mt="3" mb="2">
                    Author: {localManagePostData.user?.name}{" "}
                </Heading>
                <Heading size="3" weight="medium" m="1">
                    Topic:
                    <Box ml="-2" mt="-1">
                        <TopicSelect
                            setTopicId={setTopicId}
                            topicId={parseInt(topicId)}
                        />
                    </Box>
                </Heading>
                <Box m="1">
                    Body:
                    <TextArea
                        size="3"
                        resize="vertical"
                        value={localManagePostData.body}
                        onChange={(event) => {
                            const postDataCopy = { ...localManagePostData };
                            postDataCopy.body = event.target.value;
                            setLocalManagePostData(postDataCopy);
                        }}
                    ></TextArea>
                </Box>
                <Section>
                    <Button onClick={handleSubmission}>Submit Changes</Button>
                </Section>
            </Card>
        </Container>
    );
};

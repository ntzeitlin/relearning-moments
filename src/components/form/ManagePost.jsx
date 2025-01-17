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
import {
    getPostById,
    submitNewPost,
    updatePostById,
} from "../../services/postService";
import { TopicSelect } from "../filter/TopicSelect";
import { getUserById } from "../../services/userService";

export const ManagePost = ({ shouldEdit, getAndSetAllPosts, currentUser }) => {
    // Returns a New Post component or Edit Post component depending on the state that was passed in.

    const [localManagePostData, setLocalManagePostData] = useState({});
    const [localTopicId, setLocalTopicId] = useState(0);
    const [dropDownTopicIdValue, setDropDownTopicIdValue] = useState(0);
    const [currentUserData, setCurrentUserData] = useState({});

    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getUserById(currentUser.id).then((data) => setCurrentUserData(data));
        if (shouldEdit) {
            getPostById(postId).then((data) => setLocalManagePostData(data));
        }
    }, []);

    useEffect(() => {
        const copyLocalData = { ...localManagePostData };
        copyLocalData.topicId = dropDownTopicIdValue;
        setLocalManagePostData(copyLocalData);
    }, [dropDownTopicIdValue]);

    useEffect(() => {
        setLocalTopicId(parseInt(localManagePostData.topicId));
    }, [localManagePostData]);

    const handleSubmission = () => {
        const submissionObject = {
            userId: currentUserData.id,
            title: localManagePostData.title,
            body: localManagePostData.body,
            date: new Date(),
            topicId: localTopicId,
        };
        updatePostById(submissionObject, postId);
        getAndSetAllPosts();
        navigate(`/post/${postId}`);
    };

    const handleNewPost = () => {
        const submissionObject = {
            userId: currentUserData.id,
            title: localManagePostData.title,
            body: localManagePostData.body,
            date: new Date(),
            topicId: localTopicId,
        };

        submitNewPost(submissionObject);
        getAndSetAllPosts();
        navigate("/post/mine", {
            state: { showmyposts: true },
        });
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
                    Author: {currentUserData.name || currentUserData.fullName}{" "}
                </Heading>
                <Heading size="3" weight="medium" m="1">
                    Topic:
                    <Box ml="-2" mt="-1">
                        <TopicSelect
                            setTopicId={setDropDownTopicIdValue}
                            topicId={parseInt(localTopicId)}
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
                    {shouldEdit ? (
                        <Button color="ruby" onClick={handleSubmission}>
                            Submit Changes
                        </Button>
                    ) : (
                        <Button color="green" onClick={handleNewPost}>
                            Submit New Post
                        </Button>
                    )}
                </Section>
            </Card>
        </Container>
    );
};

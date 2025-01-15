import { Container, Grid, Section } from "@radix-ui/themes";
import { Post } from "../posts/Post";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService";

export const AllPosts = () => {
    const [allPostsArray, setAllPostsArray] = useState([]);

    useEffect(() => {
        getAllPosts().then((response) => setAllPostsArray(response));
    }, []);

    return (
        <Section>
            <Container size="4">
                <Grid columns="3">
                    {allPostsArray.map((postObject) => {
                        return (
                            <Post key={postObject.id} postInfo={postObject} />
                        );
                    })}
                </Grid>
            </Container>
        </Section>
    );
};

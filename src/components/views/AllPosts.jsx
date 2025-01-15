import { Container, Grid, Section } from "@radix-ui/themes";
import { Post } from "../posts/Post";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService";

export const AllPosts = () => {
    const [allPostsArray, setAllPostsArray] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        getAllPosts().then((response) => setAllPostsArray(response));
    }, []);

    useEffect(() => {
        setFilteredPosts(allPostsArray);
    }, [allPostsArray]);

    const filterPosts = () => {};

    return (
        <Section>
            <Container size="4">
                <Grid columns="3">
                    {filteredPosts.map((postObject) => {
                        return (
                            <Post
                                key={postObject.id}
                                postInfo={postObject}
                                detailedView={false}
                            />
                        );
                    })}
                </Grid>
            </Container>
        </Section>
    );
};

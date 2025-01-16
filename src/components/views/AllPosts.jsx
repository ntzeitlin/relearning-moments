import { Container, Grid } from "@radix-ui/themes";
import { Post } from "../posts/Post";

// eslint-disable-next-line react/prop-types
export const AllPosts = ({ filteredPosts }) => {
    return (
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
    );
};

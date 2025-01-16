/* eslint-disable react/prop-types */
import { Flex, Section } from "@radix-ui/themes";
import { SearchBox } from "./SearchBox";
import { TopicSelect } from "./TopicSelect";

export const FilterBar = ({ setSearchTerm, setTopicId, getAndSetAllPosts }) => {
    return (
        <Section>
            <Flex justify="center" align="center">
                <SearchBox setSearchTerm={setSearchTerm} />
                <TopicSelect
                    setTopicId={setTopicId}
                    getAndSetAllPosts={getAndSetAllPosts}
                />
            </Flex>
        </Section>
    );
};

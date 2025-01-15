import { Box, Select } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getAllTopics } from "../../services/topicService";

export const TopicSelect = () => {
    const [allTopicsArray, setAllTopicsArray] = useState([]);

    useEffect(() => {
        getAllTopics().then((data) => setAllTopicsArray(data));
    }, []);

    const handleTopicChange = (event) => {
        console.log(parseInt(event));
    };

    return (
        <Box m="2">
            <Select.Root
                onValueChange={handleTopicChange}
                size="2"
                defaultValue="0"
            >
                <Select.Trigger />
                <Select.Content>
                    <Select.Item value="0">Choose Topic...</Select.Item>
                    {allTopicsArray.map((topicObject) => {
                        return (
                            <Select.Item
                                key={`topic-key-${topicObject.id}`}
                                value={topicObject.id}
                            >
                                {topicObject.name}
                            </Select.Item>
                        );
                    })}
                </Select.Content>
            </Select.Root>
        </Box>
    );
};

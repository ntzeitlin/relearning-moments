import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

// eslint-disable-next-line react/prop-types
export const SearchBox = ({ setSearchTerm }) => {
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <TextField.Root
            m="2"
            onChange={handleChange}
            placeholder="Search Posts..."
        >
            <TextField.Slot>
                <MagnifyingGlassIcon />
            </TextField.Slot>
        </TextField.Root>
    );
};

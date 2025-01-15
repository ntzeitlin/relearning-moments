import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

export const SearchBox = () => {
    const handleChange = (event) => {
        console.log(event.target.value);
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

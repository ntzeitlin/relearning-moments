import {
    Button,
    Card,
    Container,
    Heading,
    Section,
    TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUserById } from "../../services/userService";

export const ManageProfile = ({ currentUser, shouldEdit }) => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUserById(userId).then((data) => setUserData(data));
    }, []);

    const handleSubmitChanges = () => {
        const submissionObject = {
            name: userData.name || userData.fullName,
            email: userData.email,
            cohort: userData.cohort,
        };

        updateUserById(submissionObject, currentUser.id);
    };

    return !location.state?.shouldEdit ? (
        <Container size="3">
            <Card size="3" m="5">
                <Heading size="4">
                    User Name: {userData.name || userData.fullName}
                </Heading>
                <Heading size="4">Cohort: {userData.cohort}</Heading>
                <Heading size="4">
                    Number of Posts: {userData.posts?.length}
                </Heading>

                <Section mt="-7" mb="-8">
                    {currentUser.id === parseInt(userId) ? (
                        <Button
                            onClick={() => {
                                navigate(`/profile/${currentUser.id}/edit`, {
                                    state: {
                                        shouldEdit: true,
                                    },
                                });
                            }}
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        ""
                    )}
                </Section>
            </Card>
        </Container>
    ) : (
        <Container size="3">
            <Card size="3">
                <Heading size="4">
                    User Name:{" "}
                    <TextField.Root
                        value={userData.name || userData.fullName}
                        onChange={(event) => {
                            const userDataCopy = { ...userData };
                            userDataCopy.name = event.target.value;
                            setUserData(userDataCopy);
                        }}
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                </Heading>
                <Heading size="4">
                    Cohort:{" "}
                    <TextField.Root
                        value={userData.cohort}
                        onChange={(event) => {
                            const userDataCopy = { ...userData };
                            userDataCopy.cohort = event.target.value;
                            setUserData(userDataCopy);
                        }}
                    ></TextField.Root>
                </Heading>
                <Heading size="4">
                    Number of Posts: {userData.posts?.length}
                </Heading>
                <Section mt="-7" mb="-8">
                    <Button
                        onClick={() => {
                            handleSubmitChanges();
                            navigate(`/profile/${currentUser.id}`);
                        }}
                    >
                        Save Profile
                    </Button>
                </Section>
            </Card>
        </Container>
    );
};

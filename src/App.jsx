import { Flex, Section } from "@radix-ui/themes";
import { TopicSelect } from "./components/filter/TopicSelect";
import { NavBar } from "./components/Nav/NavBar";
import { AllPosts } from "./components/views/AllPosts";
import { SearchBox } from "./components/filter/SearchBox";
import { useState, useEffect } from "react";
import { getAllPosts } from "./services/postService";
import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";

export const App = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="*"
                    element={
                        <Authorized>
                            <ApplicationViews />
                        </Authorized>
                    }
                />
            </Routes>
        </>
    );
};

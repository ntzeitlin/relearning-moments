/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../services/postService";
import { useEffect, useState } from "react";

import { DetailedPost } from "./DetailedPost";
import { SummaryPost } from "./SummaryPost";

export const Post = ({
    postInfo,
    detailedView,
    currentUser,
    getAndSetAllPosts,
    showDislike = false,
    viewName,
}) => {
    const { postId } = useParams();

    const [postData, setPostData] = useState({});

    useEffect(() => {
        setPostData(postInfo);
        if (detailedView) {
            getPostById(postId).then((data) => setPostData(data));
        }
    }, []);

    return !detailedView ? (
        <SummaryPost
            postData={postData}
            showDislike={showDislike}
            currentUser={currentUser}
            getAndSetAllPosts={getAndSetAllPosts}
            key={`summary-post-${viewName}-${postData.id}`}
        />
    ) : (
        <DetailedPost
            getAndSetAllPosts={getAndSetAllPosts}
            currentUser={currentUser}
            postId={postId}
            key={`detailed-post-${viewName}-${postId}`}
        />
    );
};

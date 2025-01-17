export const getAllPosts = async () => {
    return await fetch("http://localhost:8088/posts?_expand=topic&_embed=userLikedPosts").then(res => res.json())
}

export const getPostById = async (postId) => {
    return await fetch(`http://localhost:8088/posts/${postId}?_expand=topic&_expand=user&_embed=userLikedPosts`).then(response => response.json())
}

export const handleLike = async (likedPostObject) => {
    const response = await fetch(`http://localhost:8088/userLikedPosts/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(likedPostObject)
    })
    const data = await response.json()
    return data
}

export const getLikedPostByUserIdAndPostId = async (userId, postId) => {
    const response = await fetch(`http://localhost:8088/userLikedPosts?userId=${userId}&postId=${postId}`)
    const data = await response.json()
    return data
}

export const deleteLikedPostById = async (likedPostId) => {
    return await fetch(`http://localhost:8088/userLikedPosts/${likedPostId}`, {
        method: "DELETE"
    })
}

export const updatePostById = async (submissionObject, postId) => {
    return await fetch(`http://localhost:8088/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    }).then(data => data.json())
}

export const submitNewPost = async (submissionObject) => {
    return await fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    }).then(data => data.json())
}
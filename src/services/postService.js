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
export const getAllPosts = async () => {
    return await fetch("http://localhost:8088/posts?_expand=topic&_embed=userLikedPosts").then(res => res.json())
}

export const getPostById = async (postId) => {
    return await fetch(`http://localhost:8088/posts/${postId}?_expand=topic&_expand=user&_embed=userLikedPosts`).then(response => response.json())
}
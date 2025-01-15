export const getAllTopics = async () => {
    return await fetch("http://localhost:8088/topics").then(response => response.json())
}
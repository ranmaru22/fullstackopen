import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async (newBlog, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
};

const update = async (blogId, patch, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.patch(`${baseUrl}/${blogId}`, patch, config);
    return response.data;
};

export default { getAll, create, update };

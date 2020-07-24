import axios from "axios";
const baseUrl = "/api/comments";

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const getBlogComments = async blogId => {
    const response = await axios.get(`${baseUrl}?blog=${blogId}`);
    return response.data;
};

const create = async (newComment, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(baseUrl, newComment, config);
    return response.data;
};

export default { getAll, getBlogComments, create };

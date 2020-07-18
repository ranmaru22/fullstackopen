import axios from "axios";

const baseUri = "http://localhost:3001/anecdotes";

const getAll = async () => {
    const res = await axios.get(baseUri);
    return res.data;
};

const getOne = async id => {
    const res = await axios.get(`${baseUri}/${id}`);
    return res.data;
};

const create = async anecdote => {
    const res = await axios.post(baseUri, anecdote);
    return res.data;
};

const update = async (id, patch) => {
    const res = await axios.patch(`${baseUri}/${id}`, patch);
    return res.data;
};

export default { getAll, getOne, create, update };

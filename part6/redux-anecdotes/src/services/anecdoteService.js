import axios from "axios";

const baseUri = "http://localhost:3001/anecdotes";

const getAll = async () => {
    const res = await axios.get(baseUri);
    return res.data;
};

export default { getAll };

import axios from "axios";

// const baseUri = "http://localhost:3888/persons";
const baseUri = "/api/persons";

const getAll = async () => {
    const res = await axios.get(baseUri);
    return res.data;
};

const createEntry = async dataObj => {
    const res = await axios.post(baseUri, dataObj);
    return res.data;
};

const deleteEntry = async id => {
    const res = await axios.delete(`${baseUri}/${id}`);
    return res;
};

const updateEntry = async (id, patchData) => {
    const res = await axios.patch(`${baseUri}/${id}`, patchData);
    return res.data;
};

export default { getAll, createEntry, deleteEntry, updateEntry };

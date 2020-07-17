export const setFilter = filter => ({
    type: "SET",
    filter
});

export const resetFilter = () => ({
    type: "UNSET"
});

const reducer = (state = "", action) => {
    switch (action.type) {
        case "SET":
            return action.filter;
        case "UNSET":
            return "";
        default:
            return state;
    }
};

export default reducer;


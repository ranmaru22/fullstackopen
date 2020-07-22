export const initializeBlogs = () => ({ type: "INIT" });

const reducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_SUCCESS":
            return action.payload;
        case "INIT_ERROR":
            console.error(action.message);
            return state;
        default:
            return state;
    }
};

export default reducer;

export const getUserlist = () => ({
    type: "GET_USERLIST"
});

const reducer = (state = [], action) => {
    switch (action.type) {
        case "GET_USERLIST_SUCCESS":
            return action.payload;
        case "GET_USERLIST_ERROR":
            console.error(action.message);
            return state;
        default:
            return state;
    }
};

export default reducer;

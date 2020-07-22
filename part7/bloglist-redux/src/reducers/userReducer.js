export const loginUser = credentials => ({
    type: "SET_USER",
    credentials
});

export const getUserFromToken = payload => ({
    type: "SET_USER_FROM_TOKEN",
    payload
});

export const logoutUser = () => ({
    type: "UNSET_USER"
});

const reducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_USER_SUCCESS":
        case "SET_USER_FROM_TOKEN":
            return action.payload;
        case "SET_USER_ERROR":
            console.error(action.message);
            return state;
        case "UNSET_USER":
            return {};
        default:
            return state;
    }
};

export default reducer;

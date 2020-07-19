let currentTimeoutId;
export const showNotification = (msg, duration) => async dispatch => {
    dispatch({
        type: "SHOW",
        msg
    });
    currentTimeoutId = setTimeout(() => dispatch({ type: "HIDE" }), duration * 1000);
};

const reducer = (state = "", action) => {
    switch (action.type) {
        case "SHOW":
            clearTimeout(currentTimeoutId);
            return action.msg;
        case "HIDE":
            return "";
        default:
            return state;
    }
};

export default reducer;

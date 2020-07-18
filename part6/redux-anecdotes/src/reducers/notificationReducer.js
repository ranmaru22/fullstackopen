export const showNotification = (msg, duration) => async dispatch => {
    dispatch({
        type: "SHOW",
        msg
    });
    setTimeout(() => dispatch({ type: "HIDE" }), duration * 1000);
};

const reducer = (state = "", action) => {
    switch (action.type) {
        case "SHOW":
            return action.msg;
        case "HIDE":
            return "";
        default:
            return state;
    }
};

export default reducer;

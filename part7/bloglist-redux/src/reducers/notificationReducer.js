export const showNotification = (msg, isError = false, duration = 2500) => ({
    type: "SHOW_NOTIFICATION",
    payload: { msg, isError, duration }
});

const reducer = (state = {}, action) => {
    switch (action.type) {
        case "SHOW_INFO":
            return { msg: action.msg, class: "notification-msg" };
        case "SHOW_ERROR":
            return { msg: action.msg, class: "error-msg" };
        case "HIDE":
            return {};
        default:
            return state;
    }
};

export default reducer;

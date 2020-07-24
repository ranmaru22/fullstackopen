export const showNotification = (msg, isError = false, duration = 2500) => ({
    type: "SHOW_NOTIFICATION",
    payload: { msg, isError, duration }
});

const reducer = (state = {}, action) => {
    switch (action.type) {
        case "SHOW_INFO":
            return {
                msg: action.msg,
                header: action.header || "Success!",
                class: "notification-msg",
                icon: action.icon || "checkmark"
            };
        case "SHOW_ERROR":
            return {
                msg: action.msg,
                header: "Error",
                class: "error-msg",
                icon: action.icon || "exclamation triangle"
            };
        case "HIDE":
            return {};
        default:
            return state;
    }
};

export default reducer;

export const hideNotification = () => ({
    type: "HIDE"
});

export const showNotification = msg => ({
    type: "SHOW",
    msg
});

const reducer = (state = "...", action) => {
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


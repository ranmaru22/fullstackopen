import React from "react";

const Notification = ({ message, isError=false }) => {
    if (message === null) {
        return null;
    } else {
        return isError
            ? <div className="error">{message}</div>
            : <div className="notification">{message}</div>;
    }
};

export default Notification;

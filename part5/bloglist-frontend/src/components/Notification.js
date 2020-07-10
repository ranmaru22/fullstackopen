import React, { useState, useEffect } from "react";
import "./Notification.css";

const Notification = ({ args }) => {
    const { msg, isError, duration } = args;
    const [message, setMessage] = useState(null);

    useEffect(() => {
        setMessage(msg);
        setTimeout(() => setMessage(null), duration);
    }, [msg, duration]);

    return (
        <div
            className={
                message ? (isError ? "error-msg" : "notification-msg") : ""
            }
        >
            {message}
        </div>
    );
};

export default Notification;

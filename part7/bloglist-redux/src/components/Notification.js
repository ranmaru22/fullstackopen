import React from "react";
import { useSelector } from "react-redux";
import "./Notification.css";

const Notification = () => {
    const notification = useSelector(state => state.notification);
    return <div className={notification.class}>{notification.msg}</div>;
};

export default Notification;

import React from "react";
import { useSelector } from "react-redux";

import "./Notification.css";
import { Message, Icon } from "semantic-ui-react";

const Notification = () => {
    const notification = useSelector(state => state.notification);

    return notification.msg ? (
        <Message icon className={notification.class}>
            {notification.icon && <Icon name={notification.icon} />}
            <Message.Content>
                {notification.header && <Message.Header>{notification.header}</Message.Header>}
                {notification.msg}
            </Message.Content>
        </Message>
    ) : null;
};

export default Notification;

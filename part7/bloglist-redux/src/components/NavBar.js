import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { showNotification } from "../reducers/notificationReducer";

import "./NavBar.css";
import { Menu, Icon, Button } from "semantic-ui-react";

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [active, setActive] = useState("home");

    const handleLogout = () => {
        dispatch(logoutUser());
        window.localStorage.removeItem("loggedInUser");
        dispatch(showNotification("Successfully logged out ..."));
    };

    return (
        <Menu>
            <Menu.Item name="title" header={true}>
                <Icon name="blogger b" />
            </Menu.Item>
            <Menu.Item
                name="home"
                active={active === "home"}
                onClick={() => setActive("home")}
                as="div">
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item
                name="users"
                active={active === "users"}
                onClick={() => setActive("users")}
                as="div">
                <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item name="loggedInUser" position="right">
                Logged in as {user.name ?? user.username}
                <Button compact className="logoutBtn" onClick={handleLogout}>
                    Logout
                </Button>
            </Menu.Item>
        </Menu>
    );
};

export default NavBar;

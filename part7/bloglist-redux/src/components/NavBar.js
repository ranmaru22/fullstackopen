import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { showNotification } from "../reducers/notificationReducer";
import "./NavBar.css";

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const handleLogout = () => {
        dispatch(logoutUser());
        window.localStorage.removeItem("loggedInUser");
        dispatch(showNotification("Successfully logged out ..."));
    };

    return (
        <div className="navbar">
            <h4>Blogs App >></h4>
            <p>
                <Link to="/">Home</Link>
            </p>
            <p>
                <Link to="/users">Users</Link>
            </p>
            <p>Logged in as {user.name ?? user.username}</p>
            <p>
                <button id="logoutBtn" onClick={handleLogout}>
                    Logout
                </button>
            </p>
        </div>
    );
};

export default NavBar;

import React, { useState } from "react";
import PropTypes from "prop-types";
import loginService from "../services/login";

const LoginForm = ({ setUserFn, cb }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            if (user) {
                setUserFn(user);
                window.localStorage.setItem("blogAppUser", JSON.stringify(user));
                cb(`Logged in. Welcome, ${user.name ?? user.username}.`);
            }
        } catch (err) {
            cb("Error logging in. Please try again.", true);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                Username:{" "}
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div>
                Password:{" "}
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

LoginForm.propTypes = {
    setUserFn: PropTypes.func.isRequired,
    cb: PropTypes.func.isRequired
};

export default LoginForm;

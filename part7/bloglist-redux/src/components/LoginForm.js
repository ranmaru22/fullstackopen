import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";

import { Form } from "semantic-ui-react";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async e => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    return (
        <Form id="loginForm" onSubmit={handleLogin}>
            <Form.Field>
                <label>Username</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </Form.Field>
            <Form.Button type="submit">Login</Form.Button>
        </Form>
    );
};

export default LoginForm;

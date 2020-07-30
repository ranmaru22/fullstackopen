import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { UserContext } from "../userContext";

const Login = ({ show }) => {
    const [username, setUserame] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useContext(UserContext);
    const [login, result] = useMutation(LOGIN, {
        onError: err => console.log(err)
    });

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            window.localStorage.setItem("fso-booklist-user-token", token);
            window.location.reload();
        }
    }, [result.data, setToken]);

    const submitHandler = e => {
        e.preventDefault();
        login({ variables: { username, password } });
    };

    if (!show) {
        return null;
    } else if (token) {
        return <div>Logging in ...</div>;
    } else {
        return (
            <div>
                <h2>Login</h2>

                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="username">username</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={username}
                            onChange={e => setUserame(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
};

export default Login;

import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";

import { UserContext } from "./userContext";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";

const App = () => {
    const [page, setPage] = useState("authors");
    const [token, setToken] = useState(null);
    const client = useApolloClient();

    useEffect(() => {
        const maybeToken = window.localStorage.getItem("fso-booklist-user-token");
        if (maybeToken) {
            setToken(maybeToken);
        }
    }, [setToken]);

    const logoutHandler = () => {
        window.localStorage.removeItem("fso-booklist-user-token");
        setToken(null);
        client.resetStore();
        window.location.reload();
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                {token && <button onClick={() => setPage("add")}>add book</button>}
                {token && <button onClick={logoutHandler}>logout</button>}
                {!token && <button onClick={() => setPage("login")}>login</button>}
            </div>

            <UserContext.Provider value={[token, setToken]}>
                <Authors show={page === "authors"} />

                <Books show={page === "books"} />

                <NewBook show={page === "add"} />

                <Login show={page === "login"} />
            </UserContext.Provider>
        </div>
    );
};

export default App;


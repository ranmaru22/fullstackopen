import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";

const authLink = setContext((_, { headers }) => {
    const maybeToken = window.localStorage.getItem("fso-booklist-user-token");
    return {
        headers: {
            ...headers,
            Authorization: maybeToken ? `Bearer ${maybeToken}` : null
        }
    };
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(new HttpLink({ uri: "http://localhost:4000" }))
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";

const authLink = setContext((_, { headers }) => {
    const maybeToken = window.localStorage.getItem("fso-booklist-user-token");
    return {
        headers: {
            ...headers,
            Authorization: maybeToken ? `Bearer ${maybeToken}` : null
        }
    };
});

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/graphql",
    options: { reconnect: true }
});

const splitLink = split(
    op => {
        const def = getMainDefinition(op.query);
        return def.kind === "OperationDefinition" && def.operation === "subscription";
    },
    wsLink,
    authLink.concat(httpLink)
);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);

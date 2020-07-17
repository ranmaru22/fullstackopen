import React from "react";

import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnectoteList from "./components/AnecdoteList";

const App = () => (
    <div>
        <h2>Anecdotes</h2>
        <Notification />
        <AnecdoteForm />
        <AnectoteList />
    </div>
);

export default App;


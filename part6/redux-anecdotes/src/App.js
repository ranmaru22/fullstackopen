import React from "react";

import AnecdoteForm from "./components/AnecdoteForm";
import AnectoteList from "./components/AnecdoteList";

const App = () => (
    <div>
        <h2>Anecdotes</h2>
        <AnecdoteForm />
        <AnectoteList />
    </div>
);

export default App;


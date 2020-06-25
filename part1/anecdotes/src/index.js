import React, { useState } from "react";
import ReactDOM from "react-dom";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const App = props => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));

    const getRandomInt = x => Math.floor(Math.random() * Math.floor(x)); 
    const getRandomQuote = () => setSelected(getRandomInt(props.anecdotes.length));

    const vote = anecdoteNum => () => {
        console.log(votes);
        const newVotes = votes.map((elem, i) => i === anecdoteNum ? elem + 1 : elem);
        console.log(newVotes);
        return setVotes(newVotes);
    };

    return (
        <div>
            <p>{props.anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <button onClick={vote(selected)}>vote</button>
            <button onClick={getRandomQuote}>Get a random anecdote!</button>
        </div>
    );
};

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById("root")
);

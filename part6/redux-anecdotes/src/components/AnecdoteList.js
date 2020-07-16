import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { upvote } from "../reducers/anecdoteReducer";

const Anectote = ({ anecdote }) => {
    const dispatch = useDispatch();
    const vote = id => {
        dispatch(upvote(id));
    };

    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
    );
};

const AnectoteList = () => {
    const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes));

    return (
        <div>
            {anecdotes.map(a => (
                <Anectote key={a.id} anecdote={a} />
            ))}
        </div>
    );
};

export default AnectoteList;

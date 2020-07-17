import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { upvote } from "../reducers/anecdoteReducer";
import { showNotification, hideNotification } from "../reducers/notificationReducer";

const Anectote = ({ anecdote }) => {
    const dispatch = useDispatch();
    const vote = anecdote => {
        dispatch(upvote(anecdote.id));
        dispatch(showNotification(`Upvoted "${anecdote.content}"`));
        setTimeout(() => dispatch(hideNotification()), 5000);
    };

    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
    );
};

const AnectoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes));

    return (
        <div>
            {anecdotes.map(a => (
                <Anectote key={a.id} anecdote={a} />
            ))}
        </div>
    );
};

export default AnectoteList;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initialize, upvote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const Anectote = ({ anecdote }) => {
    const dispatch = useDispatch();

    const vote = anecdote => {
        dispatch(upvote(anecdote));
        dispatch(showNotification(`Upvoted "${anecdote.content}"`, 5));
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
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);

    useEffect(() => {
        dispatch(initialize());
    }, [dispatch]);

    const anecdotes = useSelector(state =>
        state.anecdotes.filter(a => a.content.includes(filter)).sort((a, b) => b.votes - a.votes)
    );

    return (
        <div>
            {anecdotes.map(a => (
                <Anectote key={a.id} anecdote={a} />
            ))}
        </div>
    );
};

export default AnectoteList;

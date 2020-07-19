import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initialize, upvote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const Anecdote = props => {
    const vote = anecdote => {
        props.upvote(anecdote);
        props.showNotification(`Upvoted "${anecdote.content}"`, 5);
    };

    return (
        <div>
            <div>{props.anecdote.content}</div>
            <div>
                has {props.anecdote.votes}
                <button onClick={() => vote(props.anecdote)}>vote</button>
            </div>
        </div>
    );
};

const AnectoteList = props => {
    const initialize = props.initialize;
    useEffect(() => {
        initialize();
    }, [initialize]);

    const anecdotes = props.anecdotes
        .filter(a => a.content.includes(props.filter))
        .sort((a, b) => b.votes - a.votes);

    return (
        <div>
            {anecdotes.map(a => (
                <Anecdote
                    key={a.id}
                    anecdote={a}
                    upvote={props.upvote}
                    showNotification={props.showNotification}
                />
            ))}
        </div>
    );
};

const mapState = state => ({
    anecdotes: state.anecdotes,
    filter: state.filter
});

const mapDispatch = {
    upvote,
    initialize,
    showNotification
};

export default connect(mapState, mapDispatch)(AnectoteList);

import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = props => {
    const newAnecdote = async e => {
        e.preventDefault();
        props.createAnecdote(e.target.content.value);
        props.showNotification(`Created "${e.target.content.value}"`, 5);
        e.target.content.value = "";
    };

    const style = { marginBottom: 10 };

    return (
        <div style={style}>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <input type="text" name="content" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

const mapDispatch = { createAnecdote, showNotification };

export default connect(null, mapDispatch)(AnecdoteForm);

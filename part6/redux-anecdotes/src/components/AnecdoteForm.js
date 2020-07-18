import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification, hideNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const newAnecdote = async e => {
        e.preventDefault();
        dispatch(createAnecdote(e.target.content.value));
        dispatch(showNotification(`Created "${e.target.content.value}"`));
        e.target.content.value = "";
        setTimeout(() => dispatch(hideNotification()), 5000);
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

export default AnecdoteForm;

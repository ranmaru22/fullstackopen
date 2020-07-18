import React from "react";
import { useDispatch } from "react-redux";
import anecdoteService from "../services/anecdoteService";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification, hideNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const newAnecdote = async e => {
        e.preventDefault();
        const data = await anecdoteService.create({ content: e.target.content.value, votes: 0 });
        dispatch(createAnecdote(data));
        dispatch(showNotification(`Created "${data.content}"`));
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

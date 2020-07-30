import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";

const NewBook = ({ show }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [published, setPublished] = useState("");
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState([]);

    const [addBook] = useMutation(ADD_BOOK, {
        onError: err => console.log(err),
        refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
    });

    const submit = event => {
        event.preventDefault();
        addBook({ variables: { title, published: Number(published), author, genres } });
        setTitle("");
        setPublished("");
        setAuthor("");
        setGenres([]);
        setGenre("");
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre("");
    };

    if (!show) {
        return null;
    } else {
        return (
            <div>
                <form onSubmit={submit}>
                    <div>
                        title
                        <input value={title} onChange={({ target }) => setTitle(target.value)} />
                    </div>
                    <div>
                        author
                        <input value={author} onChange={({ target }) => setAuthor(target.value)} />
                    </div>
                    <div>
                        published
                        <input
                            type="number"
                            value={published}
                            onChange={({ target }) => setPublished(target.value)}
                        />
                    </div>
                    <div>
                        <input value={genre} onChange={({ target }) => setGenre(target.value)} />
                        <button onClick={addGenre} type="button">
                            add genre
                        </button>
                    </div>
                    <div>genres: {genres.join(" ")}</div>
                    <button type="submit">create book</button>
                </form>
            </div>
        );
    }
};

export default NewBook;


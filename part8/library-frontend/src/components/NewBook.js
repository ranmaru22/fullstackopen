import React, { useState } from "react";
import { useMutation, useSubscription, useApolloClient } from "@apollo/client";
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, SUB_BOOK_ADDED } from "../queries";

const NewBook = ({ show }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [published, setPublished] = useState("");
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState([]);

    const client = useApolloClient();

    const updateBookCache = addedBook => {
        const isIncludedIn = (set, obj) => set.map(p => p.id).includes(obj.id);
        const storedData = client.readQuery({ query: ALL_BOOKS, variables: { genre: "" } });
        if (storedData && !isIncludedIn(storedData.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                variables: { genre: "" },
                data: { allBooks: storedData.allBooks.concat(addedBook) }
            });
        }
    };

    useSubscription(SUB_BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded;
            updateBookCache(addBook);
            window.alert(`Added ${addedBook.title}`);
        }
    });

    const [addBook] = useMutation(ADD_BOOK, {
        onError: err => console.log(err),
        refetchQueries: [{ query: ALL_AUTHORS }],
        update: (_, response) => {
            updateBookCache(response.data.addBook);
        }
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


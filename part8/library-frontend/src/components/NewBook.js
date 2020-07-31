import React, { useState } from "react";
import { useMutation, useSubscription, useApolloClient } from "@apollo/client";
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, ALL_GENRES, SUB_BOOK_ADDED } from "../queries";

const NewBook = ({ show }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [published, setPublished] = useState("");
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState([]);

    const client = useApolloClient();

    const updateBookCache = addedBook => {
        const isIncludedIn = (set, obj) => set.map(p => p.id).includes(obj.id);
        const getQuery = query => {
            try {
                return client.readQuery({ query });
            } catch (_) {
                return null;
            }
        };

        const storedBooks = getQuery(ALL_BOOKS);
        const storedAuthors = getQuery(ALL_AUTHORS);
        const storedGenres = getQuery(ALL_GENRES);

        if (storedBooks && !isIncludedIn(storedBooks.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks: storedBooks.allBooks.concat(addedBook) }
            });
            if (!isIncludedIn(storedAuthors.allAuthors, addedBook.author)) {
                client.writeQuery({
                    query: ALL_AUTHORS,
                    data: { allAuthors: storedAuthors.allAuthors.concat(addedBook.author) }
                });
            }
            addedBook.genres.forEach(genre => {
                if (!storedGenres.allGenres.includes(genre)) {
                    client.writeQuery({
                        query: ALL_GENRES,
                        data: { allGenres: storedGenres.allGenres.concat(genre) }
                    });
                }
            });
        }
    };

    useSubscription(SUB_BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded;
            updateBookCache(addedBook);
            window.alert(`Added ${addedBook.title}`);
        }
    });

    const [addBook] = useMutation(ADD_BOOK, {
        onError: err => console.log(err),
        update: (_, response) => {
            const book = response.data.addBook;
            updateBookCache(book);
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


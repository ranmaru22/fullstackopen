import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";

const Books = ({ show, filter }) => {
    const [showGenre, setShowGenre] = useState("");
    const [books, setBooks] = useState([]);
    const [fetchBooks, { loading, data }] = useLazyQuery(ALL_BOOKS);
    const genreResults = useQuery(ALL_GENRES);

    useEffect(() => {
        fetchBooks({ variables: { genre: filter?.[0] ?? showGenre } });
        if (data && data.allBooks) {
            setBooks(data.allBooks);
        }
    }, [showGenre, fetchBooks, setBooks, data, filter]);

    if (!show) {
        return null;
    } else if (loading) {
        return <div>Loading data ...</div>;
    } else {
        return (
            <div>
                <h2>books</h2>
                {filter && (
                    <h3>
                        showing books in your favorite genre <em>{filter}</em>
                    </h3>
                )}

                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>author</th>
                            <th>published</th>
                        </tr>
                        {books.map(b => (
                            <tr key={b.title}>
                                <td>{b.title}</td>
                                <td>{b.author.name}</td>
                                <td>{b.published}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {!filter && (
                    <div>
                        <button onClick={() => setShowGenre("")}>RESET FILTER</button>
                        {genreResults.data.allGenres.map(genre => (
                            <button key={genre} onClick={() => setShowGenre(genre)}>
                                {genre}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }
};

export default Books;

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";

const Books = ({ show, filter }) => {
    const bookResults = useQuery(ALL_BOOKS);
    const genreResults = useQuery(ALL_GENRES);
    const [showGenre, setShowGenre] = useState("");

    if (!show) {
        return null;
    } else if (bookResults.loading) {
        return <div>Loading data ...</div>;
    } else if (bookResults.error) {
        return <div>{bookResults.error}</div>;
    } else {
        const books = bookResults.data.allBooks;
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
                        {books
                            .filter(b =>
                                filter
                                    ? b.genres.some(elem => filter.includes(elem))
                                    : showGenre
                                    ? b.genres.includes(showGenre)
                                    : b
                            )
                            .map(b => (
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

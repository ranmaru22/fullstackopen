import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";

const Books = ({ show }) => {
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

                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>author</th>
                            <th>published</th>
                        </tr>
                        {books
                            .filter(a => (showGenre ? a.genres.includes(showGenre) : a))
                            .map(a => (
                                <tr key={a.title}>
                                    <td>{a.title}</td>
                                    <td>{a.author.name}</td>
                                    <td>{a.published}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <div>
                    <button onClick={() => setShowGenre("")}>RESET FILTER</button>
                    {genreResults.data.allGenres.map(genre => (
                        <button key={genre} onClick={() => setShowGenre(genre)}>
                            {genre}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
};

export default Books;

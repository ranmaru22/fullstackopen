import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import EditForm from "./EditForm";
import { UserContext } from "../userContext";

const Authors = ({ show }) => {
    const results = useQuery(ALL_AUTHORS);
    const [token] = useContext(UserContext);

    if (!show) {
        return null;
    } else if (results.loading) {
        return <div>Loading data ...</div>;
    } else if (results.error) {
        return <div>{results.error}</div>;
    } else {
        const authors = results.data.allAuthors;
        return (
            <div>
                <h2>authors</h2>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>born</th>
                            <th>books</th>
                        </tr>
                        {authors.map(a => (
                            <tr key={a.name}>
                                <td>{a.name}</td>
                                <td>{a.born}</td>
                                <td>{a.bookCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {token && <EditForm />}
            </div>
        );
    }
};

export default Authors;

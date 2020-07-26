import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries";

const EditForm = () => {
    const { data, loading, error } = useQuery(ALL_AUTHORS);
    const [authorList, setAuthorList] = useState([]);
    const [name, setName] = useState("");
    const [born, setBorn] = useState("");

    useEffect(() => {
        if (!loading && !error) {
            setAuthorList(data.allAuthors.map(a => a.name));
        }
    }, [data, error, loading]);

    const [editBirthyear] = useMutation(EDIT_BIRTHYEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    });

    const handleSubmit = e => {
        e.preventDefault();
        editBirthyear({ variables: { name, setBornTo: Number(born) } });
        setName("");
        setBorn("");
    };

    return (
        <div>
            <h3>Edit Author's Birth Year</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <select name="name" value={name} onChange={e => setName(e.target.value)}>
                        {authorList.map(author => (
                            <option key={author} value={author}>
                                {author}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="born">Born: </label>
                    <input
                        type="text"
                        name="born"
                        value={born}
                        onChange={e => setBorn(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Update author</button>
                </div>
            </form>
        </div>
    );
};

const Authors = ({ show }) => {
    const results = useQuery(ALL_AUTHORS);

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
                <EditForm />
            </div>
        );
    }
};

export default Authors;

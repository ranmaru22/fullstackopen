import React, { useState } from "react";

const App = () => {
    const [ persons, setPersons ] = useState([{ name: "Arto Hellas" }]);
    const [ newName, setNewName ] = useState("");

    const addToPhonebook = e => {
        e.preventDefault();
        const newPerson = { name: newName };
        setPersons(persons.concat(newPerson));
        setNewName("");
    };

    const newNameHandler = e => setNewName(e.target.value);

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addToPhonebook}>
                <div>
                    name: <input value={newName} onChange={newNameHandler} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
                <ul>
                    {persons.map(person => <li key={person.name}>{person.name}</li>)}
                </ul>
            <h2>Debug</h2>
            <div>{newName}</div>
        </div>
    );
};

export default App;

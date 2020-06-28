import React, { useState } from "react";

const App = () => {
    const [ persons, setPersons ] = useState([{ name: "Arto Hellas", number: "040-1234567" }]);
    const [ newName, setNewName ] = useState("");
    const [ newNumber, setNewNumber ] = useState("");

    const isValidEntry = name => {
        const nameIndex = persons.map(x => x.name).indexOf(name);
        return nameIndex === -1;
    }

    const addToPhonebook = e => {
        e.preventDefault();
        if (isValidEntry(newName)) {
            const newPerson = { name: newName, number: newNumber };
            setPersons(persons.concat(newPerson));
            setNewName("");
            setNewNumber("");
        } else {
            alert(`${newName} is already in the phonebook!`);
        }
    };

    const newNameHandler = e => setNewName(e.target.value);
    const newNumberHandler = e => setNewNumber(e.target.value);

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addToPhonebook}>
                <div>
                    name: <input value={newName} onChange={newNameHandler} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={newNumberHandler} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
                <ul>
                    {persons.map(person => <li key={person.name}>{person.name} : {person.number}</li>)}
                </ul>
            <h2>Debug</h2>
            <div>{newName} : {newNumber}</div>
        </div>
    );
};

export default App;

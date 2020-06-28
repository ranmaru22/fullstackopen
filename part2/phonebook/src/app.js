import React, { useState } from "react";

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" }
    ]);
    const [ newName, setNewName ] = useState("");
    const [ newNumber, setNewNumber ] = useState("");
    const [ filterVal, setFilterVal ] = useState("");

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
    const setFilter = e => setFilterVal(e.target.value);

    return (
        <div>
            <h1>Phonebook</h1>
                <div>
                    filter names: <input value={filterVal} onChange={setFilter} />
                </div>
            <h2>Add new</h2>
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
                    {
                        persons
                            .filter(val => val.name.toUpperCase().includes(filterVal.toUpperCase()))
                            .map(person => <li key={person.name}>{person.name} : {person.number}</li>)
                    }
                </ul>
        </div>
    );
};

export default App;

import React, { useState } from "react";

import Filter from "./filter";
import PersonForm from "./personform";
import Persons from "./persons";

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

    const formFields = [
        { label: "name", value: newName, handlerFunction: newNameHandler },
        { label: "number", value: newNumber, handlerFunction: newNumberHandler }
    ];

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter value={filterVal} handlerFunction={setFilter} />
            <h2>Add new</h2>
            <PersonForm formFields={formFields} handlerFunction={addToPhonebook} />
            <h2>Numbers</h2>
            <Persons persons={persons} filterVal={filterVal} />
        </div>
    );
};

export default App;

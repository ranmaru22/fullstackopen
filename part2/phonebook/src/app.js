import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./filter";
import PersonForm from "./personform";
import Persons from "./persons";

const baseUri = "http://localhost:3888/persons";

const App = () => {
    const [ persons, setPersons ] = useState(new Array(0));
    const [ newName, setNewName ] = useState("");
    const [ newNumber, setNewNumber ] = useState("");
    const [ filterVal, setFilterVal ] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(baseUri);
            setPersons(res.data);
        };
        fetchData();
    }, []);

    const isValidEntry = name => {
        const nameIndex = persons.map(x => x.name).indexOf(name);
        return nameIndex === -1;
    }

    const addToPhonebook = async e => {
        e.preventDefault();
        if (isValidEntry(newName)) {
            const newPerson = { name: newName, number: newNumber };
            const res = await axios.post(baseUri, newPerson);
            setPersons(persons.concat(res.data));
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

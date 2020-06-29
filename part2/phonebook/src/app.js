import React, { useState, useEffect } from "react";

import Filter from "./filter";
import PersonForm from "./personform";
import Persons from "./persons";

import personService from "./services/personService";

const App = () => {
    const [ persons, setPersons ] = useState(new Array(0));
    const [ newName, setNewName ] = useState("");
    const [ newNumber, setNewNumber ] = useState("");
    const [ filterVal, setFilterVal ] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const persons = await personService.getAll();
            setPersons(persons);
        };
        try {
            fetchData();
        } catch (error) {
            console.error("Could not fetch data from server.");
        }
    }, []);

    const isValidEntry = name => {
        const nameIndex = persons.map(x => x.name).indexOf(name);
        return nameIndex === -1;
    }

    const addToPhonebook = async e => {
        e.preventDefault();
        if (isValidEntry(newName)) {
            try {
                const newPerson = { name: newName, number: newNumber };
                const addedPerson = await personService.createEntry(newPerson);
                setPersons(persons.concat(addedPerson));
                setNewName("");
                setNewNumber("");
            } catch (error) {
                console.error("Error adding entry to phonebook.");
            }
        } else {
            alert(`${newName} is already in the phonebook!`);
        }
    };

    const deleteFromPhonebook = async entry => {
        if (window.confirm(`Do you really want to delete ${entry.name} from the phonebook?`)) {
            try {
                await personService.deleteEntry(entry.id);
                setPersons(persons.filter(p => p.id !== entry.id));
            } catch (error) {
                console.error("Error deleting entry.");
            }
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
            <Persons persons={persons} filterVal={filterVal} deleteFunction={deleteFromPhonebook} />
        </div>
    );
};

export default App;

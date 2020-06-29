import React, { useState, useEffect } from "react";

import Filter from "./filter";
import PersonForm from "./personform";
import Persons from "./persons";
import Notification from "./notification";

import personService from "./services/personService";

const App = () => {
    const [ persons, setPersons ] = useState(new Array(0));
    const [ newName, setNewName ] = useState("");
    const [ newNumber, setNewNumber ] = useState("");
    const [ filterVal, setFilterVal ] = useState("");
    const [ notification, setNotification ] = useState(null);
    const [ errorMsg, setErrorMsg ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const persons = await personService.getAll();
            setPersons(persons);
        };
        try {
            fetchData();
        } catch (error) {
            showError("Error fetching data from the server.", 5000);
        }
    }, []);

    const showNotification = (message, timeout=2500) => {
        setNotification(message);
        setTimeout(() => setNotification(null), timeout);
    };

    const showError = (message, timeout=2500) => {
        setErrorMsg(message);
        setTimeout(() => setNotification(null), timeout);
    };

    const isAlreadyInPhonebook = name => persons.find(p => p.name === name);

    const addOrUpdate = async e => {
        e.preventDefault();
        const found = isAlreadyInPhonebook(newName);
        if (!found) {
            try {
                const newPerson = { name: newName, number: newNumber };
                const addedPerson = await personService.createEntry(newPerson);
                setPersons(persons.concat(addedPerson));
                showNotification(`${addedPerson.name} added to phonebook.`);
            } catch (error) {
                showError(`Error adding entry to the phonebook`);
            }
        } else {
            if (window.confirm(`${found.name} is already in the phonebook. Update the number?`)) {
                try {
                    const patchData = { number: newNumber };
                    const updatedPerson = await personService.updateEntry(found.id, patchData);
                    setPersons(persons.map(p => p.name === updatedPerson.name ? updatedPerson : p));
                    showNotification(`Number for ${found.name} updated.`);
                } catch (error) {
                    showError(`Error updating entry ${found.name}`);
                }
            }
        }
        setNewName("");
        setNewNumber("");
    };

    const deleteFromPhonebook = async entry => {
        if (window.confirm(`Do you really want to delete ${entry.name} from the phonebook?`)) {
            try {
                await personService.deleteEntry(entry.id);
                setPersons(persons.filter(p => p.id !== entry.id));
                showNotification(`${entry.name} deleted from phonebook.`);
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
            <Notification message={notification} />
            <Notification message={errorMsg} isError={true} />
            <Filter value={filterVal} handlerFunction={setFilter} />
            <h2>Add new</h2>
            <PersonForm formFields={formFields} handlerFunction={addOrUpdate} />
            <h2>Numbers</h2>
            <Persons persons={persons} filterVal={filterVal} deleteFunction={deleteFromPhonebook} />
        </div>
    );
};

export default App;

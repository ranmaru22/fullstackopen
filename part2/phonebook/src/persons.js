import React from "react";

const Persons = ({ persons, filterVal }) => (
    <ul>
        {
            persons
                .filter(val => val.name.toUpperCase().includes(filterVal.toUpperCase()))
                .map(val => <li key={val.name}>{val.name} : {val.number}</li>)
        }
    </ul>
);

export default Persons;

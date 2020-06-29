import React from "react";

const Persons = ({ persons, filterVal, deleteFunction }) => (
    <ul>
        {
            persons
                .filter(val => val.name.toUpperCase().includes(filterVal.toUpperCase()))
                .map(val => (
                    <li key={val.name}>
                        {val.name} : {val.number}
                        <button onClick={() => deleteFunction(val)}>delete</button>
                    </li>
                ))
        }
    </ul>
);

export default Persons;

import React from "react";

const Filter = ({ value, handlerFunction }) => (
    <div>
        <label>Filter: </label>
        <input value={value} onChange={handlerFunction} />
    </div>
);

export default Filter;

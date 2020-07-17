import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, resetFilter } from "../reducers/filterReducer";

const Filter = () => {
    const dispatch = useDispatch();
    const [filterVal, setFilterVal] = useState(useSelector(state => state.filter));

    const style = { marginBottom: 10 };

    const handleFilterChange = e => {
        setFilterVal(e.target.value);
        dispatch(setFilter(filterVal));
    };

    const clearFilter = () => {
        setFilterVal("");
        dispatch(resetFilter());
    };

    return (
        <div style={style}>
            <h2>Filter</h2>
            <input type="text" name="filter" value={filterVal} onChange={handleFilterChange} />
            <button onClick={clearFilter}>Reset</button>
        </div>
    );
};

export default Filter;

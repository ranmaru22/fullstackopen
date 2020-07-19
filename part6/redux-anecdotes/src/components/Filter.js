import React, { useState } from "react";
import { connect } from "react-redux";
import { setFilter, resetFilter } from "../reducers/filterReducer";

const Filter = props => {
    const [filterVal, setFilterVal] = useState(props.filter);

    const style = { marginBottom: 10 };

    const handleFilterChange = e => {
        setFilterVal(e.target.value);
        props.setFilter(filterVal);
    };

    const clearFilter = () => {
        setFilterVal("");
        props.resetFilter();
    };

    return (
        <div style={style}>
            <h2>Filter</h2>
            <input type="text" name="filter" value={filterVal} onChange={handleFilterChange} />
            <button onClick={clearFilter}>Reset</button>
        </div>
    );
};

const mapState = state => ({
    filter: state.filter
});

const mapDispatch = { setFilter, resetFilter };

export default connect(mapState, mapDispatch)(Filter);

import React from "react";

const PersonForm = ({ formFields, handlerFunction }) => (
    <form onSubmit={handlerFunction}>
        {formFields.map(field => (
            <div key={field.label}>
                <label>{field.label}</label>
                <input value={field.value} onChange={field.handlerFunction}/>
            </div>
        ))}
        <div>
            <button type="submit">add</button>
        </div>
    </form>
);

export default PersonForm;

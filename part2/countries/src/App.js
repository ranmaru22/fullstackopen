import React, { useState, useEffect } from 'react';
import axios from "axios";

const Results = ({ returnData }) => {
    if (returnData.length > 10) {
        return <p>Too many results, please make your filter more specific.</p>;
    } else if (returnData.length === 1) {
        const country = returnData[0];
        return (
            <section>
                <h2>{country.name}</h2>
                <p>Demonym: {country.demonym}</p>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <h3>Languages</h3>
                <ul>
                    {country.languages.map(elem => <li key={elem.iso639_1}>{elem.name}</li>)}
                </ul>
                <img src={country.flag} alt={`Flag of ${country.name}`} width="100" />
            </section>
        );
    } else {
        return (
            <ul>
                {returnData.map(elem => <li key={elem.alpha3Code}>{elem.name}</li>)}
            </ul>
        );
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState(new Array(0));

    const doSearch = e => {
        setSearchTerm(e.target.value);
        axios.get(`https://restcountries.eu/rest/v2/name/${searchTerm}`).then(res => {
            console.log(res.data)
            setResults(res.data);
        });
    };

    return (
        <div>
            <div>
                <label>find countries:</label>
                <input value={searchTerm} onChange={doSearch} />
            </div>
            <div>
                <Results returnData={results} />
            </div>
        </div>
    );
};

export default App;

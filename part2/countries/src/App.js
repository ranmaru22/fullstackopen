import React, { useState, useEffect } from 'react';
import axios from "axios";

const Details = ({ country, isHidden=false }) => (
    <section id={country.alpha3Code} style={{display: isHidden ? "none" : "block"}}>
        <h2>{country.name}</h2>
        <p>Demonym: {country.demonym}</p>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>
            {country.languages.map(elem => <li key={elem.iso639_1}> {elem.name} </li>)}
        </ul>
        <img src={country.flag} alt={`Flag of ${country.name}`} width="100" />
    </section>
);

const Results = ({ returnData }) => {
    const showDetails = country => () => {
        document.querySelector(`#${country.alpha3Code}`).setAttribute("style", "display: block;");
    };

    if (returnData.length === 0) {
        return <p>No results.</p>;
    } else if (returnData.length > 10) {
        return <p>Too many results, please make your filter more specific.</p>;
    } else if (returnData.length === 1) {
        return <Details country={returnData[0]} />;
    } else {
        return (
            <ul>
                {returnData.map(elem =>
                    <li key={elem.alpha3Code}>
                        {elem.name}
                        <button onClick={showDetails(elem)}>Show Details</button>
                        <Details country={elem} isHidden={true} />
                    </li>
                )}
            </ul>
        );
    }
}

const App = () => {
    const [allCountries, setAllCountries] = useState(new Array(0));

    useEffect(() => {
        axios.get(`https://restcountries.eu/rest/v2/all`)
            .then(res => { setAllCountries(res.data); })
            .catch(() => { setAllCountries(new Array(0)); });
    },[]);

    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState(new Array(0));

    const doSearch = e => {
        setSearchTerm(e.target.value);
        setResults(allCountries.filter(elem => elem.name.includes(searchTerm)));
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

import React, { useState, useEffect } from 'react';
import axios from "axios";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const Weather = ({ city, countryCode }) => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`)
            .then(result => { setWeather(result.data); })
            .catch(() => { setWeather({}); });
    }, [city, countryCode]);

    if (Object.entries(weather).length > 0) {
        return (
            <div>
                <h3>Weather in {city}</h3>
                <p>Temperature: {weather.main?.temp} C</p>
                <p>Condition: {weather.weather?.[0].description}</p>
                <p>Wind: {weather.wind?.speed} m/sec</p>
            </div>
        );
    } else {
        return <p>Couldn't load weather data. :(</p>;
    }
};

const Details = ({ country }) => (
    <section id={country.alpha3Code}>
        <h2>{country.name}</h2>
        <p>Demonym: {country.demonym}</p>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>
            {country.languages.map(elem => <li key={elem.iso639_1}> {elem.name} </li>)}
        </ul>
        <img src={country.flag} alt={`Flag of ${country.name}`} width="100" />
        <Weather city={country.capital} countryCode={country.alpha2Code} />
    </section>
);

const CountryListEntry = ({ country }) => {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => setClicked(!clicked);

    return (
        <li>
            {country.name}
            <button onClick={handleClick}>{clicked ? "Hide" : "Show"} Details</button>
            {clicked ? <Details country={country} /> : null }
        </li>
    );
};

const Results = ({ returnData }) => {
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
                    <CountryListEntry country={elem} key={elem.alpha3Code} />
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

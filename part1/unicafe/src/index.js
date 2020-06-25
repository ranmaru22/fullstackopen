import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const clickHandlerGood = () => setGood(good + 1);
    const clickHandlerNeutral = () => setNeutral(neutral + 1);
    const clickHandlerBad = () => setBad(bad + 1);

    const all = good + bad + neutral;
    const avg = (good - bad) / all;
    const pos = `${String((good / all) * 100)}%`;

    return (
        <div>
            <h1>Give Feedback</h1>
            <div>
                <button onClick={clickHandlerGood}>good</button>
                <button onClick={clickHandlerNeutral}>neutral</button>
                <button onClick={clickHandlerBad}>bad</button>
            </div>
            <h1>Statistics</h1>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>All: {all}</p>
            <p>Average: {avg}</p>
            <p>Positive: {pos}</p>
        </div>
    );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

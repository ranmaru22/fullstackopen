import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = props => <button onClick={props.onClick}>{props.text}</button>;

const Statistics = props => {
    const all = props.good + props.bad + props.neutral;
    const avg = (props.good - props.bad) / all;
    const pos = `${String((props.good / all) * 100)}%`;

    return props.good === 0 && props.neutral === 0 && props.bad === 0
        ? <p>No feedback given.</p>
        : (
            <div>
                <h1>Statistics</h1>
                <p>Good: {props.good}</p>
                <p>Neutral: {props.neutral}</p>
                <p>Bad: {props.bad}</p>
                <p>All: {all}</p>
                <p>Average: {avg}</p>
                <p>Positive: {pos}</p>
            </div>
        );

};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const clickHandlerGood = () => setGood(good + 1);
    const clickHandlerNeutral = () => setNeutral(neutral + 1);
    const clickHandlerBad = () => setBad(bad + 1);


    return (
        <div>
            <h1>Give Feedback</h1>
            <div>
                <Button onClick={clickHandlerGood} text="good" />
                <Button onClick={clickHandlerNeutral} text="neutral" />
                <Button onClick={clickHandlerBad} text="bad" />
            </div>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

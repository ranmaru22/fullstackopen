import React from "react";
import ReactDOM from "react-dom";

const Header = props => (
    <header>
        <h1>{props.course}</h1>
    </header>
);

const Content = props => (
    <div>
        {props.parts.map(elem => <Part part={elem.name} exercises={elem.exercises} />)}
    </div>
);

const Part = props => (
    <p>{props.part}: {props.exercises}</p>
);

const Total = props => (
    <p>Number of Exercises: {props.exercises.reduce((acc, val) => acc + val, 0)}</p>
);

const App = () => {
    const course = "Half Stack application development";
    const parts = [
        { name: "Fundamentals of React", exercises: 10 },
        { name: "Using props to pass data", exercises: 7 },
        { name: "State of a component", exercises: 14 },
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total exercises={[parts[0].exercises, parts[1].exercises, parts[2].exercises]} />
        </div>
    );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);


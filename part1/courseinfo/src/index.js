import React from "react";
import ReactDOM from "react-dom";

const Header = props => (
    <header>
        <h1>{props.course.name}</h1>
    </header>
);

const Content = props => (
    <div>
        {props.course.parts.map(elem => <Part part={elem.name} exercises={elem.exercises} />)}
    </div>
);

const Part = props => <p>{props.part}: {props.exercises}</p>;

const Total = props => <p>Number of Exercises: {props.course.parts.reduce((acc, val) => acc + val.exercises, 0)}</p>;

const App = () => {
    const course = { 
        name: "Half Stack application development",
        parts: [
            { name: "Fundamentals of React", exercises: 10 },
            { name: "Using props to pass data", exercises: 7 },
            { name: "State of a component", exercises: 14 },
        ]
    };

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);


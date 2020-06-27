import React from "react";

const Header = ({ name }) => {
    return <h1>{name}</h1>;
};

const Total = ({ parts }) => {
    const sum = parts.reduce((acc, part) => acc + part.exercises, 0);
    return <p><strong>Number of exercises {sum}</strong></p>;
};

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}

export default Course;

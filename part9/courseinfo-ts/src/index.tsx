import React from "react";
import ReactDOM from "react-dom";

const Header: React.FC<{ name: string }> = ({ name }) => {
    return <h1>{name}</h1>;
};

interface Course {
    name: string;
    exerciseCount: number;
}

const Content: React.FC<{ courseList: Course[] }> = ({ courseList }) => {
    return (
        <div>
            {courseList.map(c => (
                <p key={c.name}>
                    {c.name} {c.exerciseCount}
                </p>
            ))}
        </div>
    );
};

const Total: React.FC<{ total: number }> = ({ total }) => {
    return <p>Number of exercises: {total}</p>;
};

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts = [
        {
            name: "Fundamentals",
            exerciseCount: 10
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14
        }
    ];
    const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

    return (
        <>
            <Header name={courseName} />
            <Content courseList={courseParts} />
            <Total total={total} />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));

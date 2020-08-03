import React from "react";
import ReactDOM from "react-dom";

const Header: React.FC<{ name: string }> = ({ name }) => {
    return <h1>{name}</h1>;
};

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartWithDesc extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartWithDesc {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDesc {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDesc {
    name: "The Awesomeness of Typescript";
    recommendedReading: string[];
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case "Fundamentals": {
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>{part.description}</p>
                    <p>Exercises: {part.exerciseCount}</p>
                </div>
            );
        }
        case "Using props to pass data":
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>Exercises: {part.exerciseCount}</p>
                    <p>Group Projects: {part.groupProjectCount}</p>
                </div>
            );
        case "Deeper type usage":
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>{part.description}</p>
                    <p>Exercises: {part.exerciseCount}</p>
                    <p>Link: {part.exerciseSubmissionLink}</p>
                </div>
            );
        case "The Awesomeness of Typescript":
            return (
                <div>
                    <h2>{part.name}</h2>
                    <p>{part.description}</p>
                    <p>Exercises: {part.exerciseCount}</p>
                    Recommended Reading:
                    <ul>
                        {part.recommendedReading.map((r, i) => (
                            <li key={i}>{r}</li>
                        ))}
                    </ul>
                </div>
            );
        default:
            ((x: never): never => {
                throw new Error(`Unhandled union member: ${JSON.stringify(x)}`);
            })(part);
    }
};

const Content: React.FC<{ courseList: CoursePart[] }> = ({ courseList }) => {
    return (
        <div>
            {courseList.map(c => (
                <Part key={c.name} part={c} />
            ))}
        </div>
    );
};

const Total: React.FC<{ total: number }> = ({ total }) => {
    return <p>Total number of exercises: {total}</p>;
};

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
        },
        {
            name: "The Awesomeness of Typescript",
            exerciseCount: 12,
            description: "Typescript is indeed awesome",
            recommendedReading: [
                "Typescript basics",
                "More Typescript basics",
                "Advanced Typescript"
            ]
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

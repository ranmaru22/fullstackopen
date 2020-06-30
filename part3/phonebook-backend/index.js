import express from "express";
const app = express();

const PORT = 3001;

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
];

app.use(express.json());

app.get("/info", (req, res) => {
    res.set("Content-Type", "text/plain");
    res.send(`Phonebook has info for ${persons.length} people.\n\n${new Date()}`);
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));

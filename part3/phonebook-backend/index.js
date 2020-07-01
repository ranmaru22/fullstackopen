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

const getRandomId = seed => {
    const baseId = Number(Math.random().toString().slice(2,12));
    return baseId + seed.split("").reduce((acc, _, i) => acc + seed.charCodeAt(i), 0);
};

app.use(express.json());

app.get("/info", (req, res) => {
    res.set("Content-Type", "text/plain");
    res.send(`Phonebook has info for ${persons.length} people.\n\n${new Date()}`);
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.post("/api/persons", (req, res) => {
    const newPerson = { name: req.body.name, number: req.body.number, id: getRandomId(req.body.name) };
    persons = persons.concat(newPerson);
    res.status(201).json(newPerson);
});

app.get("/api/persons/:id", (req, res) => {
    const person = persons.find(p => Number(req.params.id) === p.id);
    if (!person) {
        res.status(404).end();
    } else {
        res.json(person);
    }
});

app.delete("/api/persons/:id", (req, res) => {
    const person = persons.find(p => Number(req.params.id) === p.id);
    if (!person) {
        res.status(404).end();
    } else {
        persons = persons.filter(p => p !== person);
        res.status(204).end();
    }
});

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));

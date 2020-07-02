import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3001;

import Person from "./models/people.js";

// Define utility functions
const unknownEndpoint = (req, res) =>
    res.status(404).send({ error: "unknown endpoint " });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(
    morgan((tokens, req, res) =>
        [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
            Object.keys(req.body).length > 0
                ? "\n-> " + JSON.stringify(req.body)
                : ""
        ].join(" ")
    )
);

// Routes
app.get("/info", (req, res) => {
    res.set("Content-Type", "text/plain");
    res.send(
        `Phonebook has info for ${persons.length} people.\n\n${new Date()}`
    );
});

app.get("/api/persons", async (req, res) => {
    const results = await Person.find().exec();
    res.json(results);
});

app.post("/api/persons", async (req, res) => {
    if (!req.body.name || !req.body.number) {
        res.status(400).json({ error: "Must provide name and number." });
    } else {
        const newPerson = new Person({
            name: req.body.name,
            number: req.body.number
        });
        await newPerson.save();
        res.status(201).json(newPerson);
    }
});

app.get("/api/persons/:id", async (req, res) => {
    const person = await Person.findById(req.params.id).exec();
    if (!person) {
        res.status(404).json({ error: "Entry not found." });
    } else {
        res.json(person);
    }
});

app.delete("/api/persons/:id", async (req, res) => {
    const person = await Person.findById(req.params.id).exec();
    if (!person) {
        res.status(404).json({ error: "Entry not found." });
    } else {
        persons = persons.filter(p => p !== person);
        res.status(204).end();
    }
});

// Catch unknown endpoints
app.use(unknownEndpoint);

// Start server
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));

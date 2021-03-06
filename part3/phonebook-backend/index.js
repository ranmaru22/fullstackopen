import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3001;

import Person from "./models/people.js";

// Define utility functions
const unknownEndpoint = (req, res) =>
    res.status(404).send({ error: "unknown endpoint " });

const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    switch (err.name) {
        case "CastError":
            return res.status(400).json({ error: "Malformatted ID." });
        case "ValidationError":
            return res.status(400).json({ error: err.message });
        default:
            next(err);
    }
};

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
app.get("/info", async (req, res, next) => {
    try {
        const personCount = await Person.countDocuments().exec();
        res.set("Content-Type", "text/plain");
        res.send(
            `Phonebook has info for ${personCount} people.\n\n${new Date()}`
        );
    } catch (err) {
        next(err);
    }
});

app.get("/api/persons", async (req, res, next) => {
    try {
        const results = await Person.find().exec();
        res.json(results);
    } catch (err) {
        next(err);
    }
});

app.post("/api/persons", async (req, res, next) => {
    if (!req.body.name || !req.body.number) {
        res.status(400).json({ error: "Must provide name and number." });
    } else {
        try {
            const newPerson = new Person({
                name: req.body.name,
                number: req.body.number
            });
            await newPerson.save();
            res.status(201).json(newPerson);
        } catch (err) {
            next(err);
        }
    }
});

app.get("/api/persons/:id", async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id).exec();
        if (!person) {
            res.status(404).json({ error: "Entry not found." });
        } else {
            res.json(person);
        }
    } catch (err) {
        next(err);
    }
});

app.patch("/api/persons/:id", async (req, res, next) => {
    try {
        const patch = { number: req.body.number };
        const updatedPerson = await Person.findByIdAndUpdate(
            req.params.id,
            patch,
            { new: true, runValidators: true }
        ).exec();
        if (!updatedPerson) {
            res.status(404).json({ error: "Entry not found." });
        } else {
            res.status(200).json(updatedPerson);
        }
    } catch (err) {
        next(err);
    }
});

app.delete("/api/persons/:id", async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id).exec();
        if (!person) {
            res.status(404).json({ error: "Entry not found." });
        } else {
            await person.delete();
            res.status(204).end();
        }
    } catch (err) {
        next(err);
    }
});

// Catch unknown endpoints
app.use(unknownEndpoint);

// Catch errors
app.use(errorHandler);

// Start server
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));

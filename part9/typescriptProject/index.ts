import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { calculateBmi } from "./modules/bmi";
import { calculateExercises, Statistics } from "./modules/exercises";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/hello", (_req: Request, res: Response): void => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response): void => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (!height || !weight) {
        res.status(400).json({ error: "malformatted parameters" });
    } else {
        const result = { height, weight, bmi: calculateBmi(height, weight) };
        res.json(result);
    }
});

app.post("/exercises", bodyParser.json(), (req: Request, res: Response) => {
    const hours: number[] = req.body.daily_exercises;
    const hoursValid: boolean = hours.every(el => typeof el === "number");
    const target: number = req.body.target;
    if (!hours || !target) {
        res.status(400).json({ error: "parameters missing" });
    } else if (!hoursValid || typeof target !== "number") {
        res.status(400).json({ error: "malformatted parameters" });
    } else {
        const result: Statistics = calculateExercises(hours, target);
        res.json(result);
    }
});

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});

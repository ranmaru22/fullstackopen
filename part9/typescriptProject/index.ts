import express, { Request, Response } from "express";
import { calculateBmi } from "./modules/bmi";

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});

import express, { Request, Response } from "express";
import cors from "cors";

import diagnosesRouter from "./routes/diagnoses";

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req: Request, res: Response) => {
    res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});

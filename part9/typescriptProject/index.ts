import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.get("/hello", (_req: Request, res: Response) => {
    res.send("Hello Full Stack!");
});

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});

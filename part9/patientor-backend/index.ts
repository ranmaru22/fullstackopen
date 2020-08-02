import express, { Request, Response } from "express";
const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/ping", (_req: Request, res: Response) => {
    res.send("pong");
});

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});

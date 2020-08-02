import express, { Request, Response } from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
    res.send(diagnosesService.getAllDiagnoses());
});

export default router;

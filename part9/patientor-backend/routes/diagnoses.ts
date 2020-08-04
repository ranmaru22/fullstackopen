import express, { Request, Response } from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
    res.send(diagnosesService.getAllDiagnoses());
});

router.get("/:diagCode", (req: Request, res: Response) => {
    res.send(diagnosesService.getDiagnosisByCode(req.params.diagCode));
});

export default router;

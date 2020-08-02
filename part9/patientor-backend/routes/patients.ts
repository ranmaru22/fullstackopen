import express, { Request, Response } from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
    res.send(patientsService.getCleanedPatientData());
});

export default router;

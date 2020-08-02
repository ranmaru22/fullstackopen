import express, { Request, Response } from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
    res.send(patientsService.getCleanedPatientData());
});

router.post("/", (req: Request, res: Response) => {
    const newPatient = patientsService.addPatient(req.body);
    res.send(newPatient);
});

export default router;

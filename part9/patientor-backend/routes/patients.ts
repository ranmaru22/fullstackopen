import express, { Request, Response } from "express";
import patientsService from "../services/patientsService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
    res.send(patientsService.getCleanedPatientData());
});

router.post("/", (req: Request, res: Response) => {
    try {
        const maybeNewPatient = toNewPatient(req.body);
        const newPatient = patientsService.addPatient(maybeNewPatient);
        res.send(newPatient);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

export default router;

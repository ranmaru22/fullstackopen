import data from "../data/patients.json";
import { v4 as uuid4 } from "uuid";
import type { Patient, CleanedPatientData, NewPatientTemplate } from "../types";

const patientData = <Patient[]>data;

const getCleanedPatientData = (): CleanedPatientData[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (obj: NewPatientTemplate): Patient => {
    const newPatient = {
        id: uuid4(),
        ...obj
    };
    patientData.push(newPatient);
    return newPatient;
};

export default { getCleanedPatientData, addPatient };

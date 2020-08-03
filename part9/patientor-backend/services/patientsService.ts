import data from "../data/patients.json";
import { v4 as uuidv4 } from "uuid";
import { toNewPatient } from "../utils";
import type { Patient, CleanedPatientData, NewPatientTemplate } from "../types";

const patientData: Patient[] = data.map(obj => {
    const newPatient = <Patient>toNewPatient(obj);
    newPatient.id = obj.id;
    return newPatient;
});

const getCleanedPatientData = (): CleanedPatientData[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getPatientById = (id: string): Patient | undefined => {
    const patient = patientData.find(p => p.id === id);
    return patient;
};

const addPatient = (obj: NewPatientTemplate): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...obj
    };
    patientData.push(newPatient);
    return newPatient;
};

export default { getCleanedPatientData, getPatientById, addPatient };

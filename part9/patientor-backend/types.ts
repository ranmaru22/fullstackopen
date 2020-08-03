export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry {}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: Date;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type CleanedPatientData = Omit<Patient, "ssn" | "entries">;
export type NewPatientTemplate = Omit<Patient, "id">;

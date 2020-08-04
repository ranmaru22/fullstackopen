export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export enum HealthCheckRating {
    Healthy,
    LowRisk,
    HighRisk,
    CritialRisk
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
    id: string;
    description: string;
    date: Date;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: { startDate: Date; endDate: Date };
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: { date: Date; criteria: string };
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

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

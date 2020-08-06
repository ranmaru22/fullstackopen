export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export enum EntryType {
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare",
    HealthCheck = "HealthCheck"
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
    type: EntryType;
    description: string;
    date: Date;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcare;
    employerName: string;
    sickLeave?: { startDate: Date; endDate: Date };
}

export interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: { date: Date; criteria: string };
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;
export type NewEntryTemplate =
    | Omit<HealthCheckEntry, "id">
    | Omit<OccupationalHealthcareEntry, "id">
    | Omit<HospitalEntry, "id">;

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

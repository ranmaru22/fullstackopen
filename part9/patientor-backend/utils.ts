import { Gender, HealthCheckRating, Entry, NewPatientTemplate } from "./types";

const isString = (x: any): x is string => typeof x === "string" || x instanceof String;
const isDateStr = (x: any): boolean => !!Date.parse(x);
const isGender = (x: any): x is Gender => Object.values(Gender).includes(x);
const isHealthCheckRating = (x: any): x is HealthCheckRating =>
    Object.values(HealthCheckRating).includes(x);

const isBaseEntry = (x: any): boolean =>
    x.id !== undefined &&
    x.description !== undefined &&
    isDateStr(x.date) &&
    x.specialist !== undefined;

const isHospitalEntry = (x: any): boolean =>
    isBaseEntry(x) &&
    x.type === "Hospital" &&
    isDateStr(x.discharge.date) &&
    x.discharge.criteria !== undefined;

const isOccupationalHealthcareEntry = (x: any): boolean =>
    isBaseEntry(x) && x.type === "OccupationalHealthcare" && x.employerName !== undefined;

const isHealthCheckEntry = (x: any): boolean =>
    isBaseEntry(x) && x.type === "HealthCheck" && isHealthCheckRating(x.healthCheckRating);

const isEntry = (x: any): x is Entry =>
    isHospitalEntry(x) || isOccupationalHealthcareEntry(x) || isHealthCheckEntry(x);

const stringParse = (str: any, fieldName?: string): string => {
    if (!isString(str)) {
        throw new Error(`Invalid value${fieldName ? ` in field ${fieldName}` : ""}: ${str}`);
    }
    return str;
};

const dateParse = (date: any): Date => {
    if (!isString(date) || !isDateStr(date)) {
        throw new Error(`Invalid date: ${date}`);
    }
    return new Date(date);
};

const genderParse = (gender: any): Gender => {
    if (!isGender(gender)) {
        throw new Error(`Invalid gender: ${gender}`);
    }
    return gender;
};

const entryParse = (entry: any): Entry => {
    if (!isEntry(entry)) {
        throw new Error(`Invalid entry: ${entry}`);
    }
    return entry;
};

export const toNewPatient = (obj: any): NewPatientTemplate => {
    const newPatient: NewPatientTemplate = {
        name: stringParse(obj.name, "name"),
        dateOfBirth: dateParse(obj.dateOfBirth),
        ssn: stringParse(obj.ssn, "ssn"),
        gender: genderParse(obj.gender),
        occupation: stringParse(obj.occupation, "occupation"),
        entries: obj.entries.map((x: any) => entryParse(x))
    };
    return newPatient;
};

import { Gender, NewPatientTemplate } from "./types";

const isString = (x: any): x is string => typeof x === "string" || x instanceof String;
const isDateStr = (x: any): boolean => !!Date.parse(x);
const isGender = (x: any): x is Gender => Object.values(Gender).includes(x);

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

export const toNewPatient = (obj: any): NewPatientTemplate => {
    const newPatient: NewPatientTemplate = {
        name: stringParse(obj.name, "name"),
        dateOfBirth: dateParse(obj.dateOfBirth),
        ssn: stringParse(obj.ssn, "ssn"),
        gender: genderParse(obj.gender),
        occupation: stringParse(obj.occupation, "occupation"),
        entries: []
    };
    return newPatient;
};

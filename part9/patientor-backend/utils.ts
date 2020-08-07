import {
    Gender,
    HealthCheckRating,
    Entry,
    EntryType,
    NewEntryTemplate,
    HospitalEntry,
    OccupationalHealthcareEntry,
    HealthCheckEntry,
    NewPatientTemplate
} from "./types";

const assertNever = (x: never): never => {
    throw new Error(`Unhandled union member: ${JSON.stringify(x)}`);
};

const isString = (x: any): x is string => typeof x === "string" || x instanceof String;
const isDateStr = (x: any): boolean => !!Date.parse(x);
const isGender = (x: any): x is Gender => Object.values(Gender).includes(x);
const isHealthCheckRating = (x: any): x is HealthCheckRating =>
    Object.values(HealthCheckRating).includes(Number(x));

const isBaseEntry = (x: any, newEntry?: boolean): boolean =>
    (newEntry ? true : x.id !== undefined) &&
    x.description !== undefined &&
    isDateStr(x.date) &&
    x.specialist !== undefined;

const isHospitalEntry = (x: any, newEntry?: boolean): x is HospitalEntry =>
    isBaseEntry(x, newEntry) &&
    x.type === EntryType.Hospital &&
    isDateStr(x.discharge.date) &&
    x.discharge.criteria !== undefined;

const isOccupationalHealthcareEntry = (
    x: any,
    newEntry?: boolean
): x is OccupationalHealthcareEntry =>
    isBaseEntry(x, newEntry) &&
    x.type === EntryType.OccupationalHealthcare &&
    x.employerName !== undefined &&
    x.sickLeave
        ? isDateStr(x.sickLeave.startDate) && isDateStr(x.sickLeave.endDate)
        : true;

const isHealthCheckEntry = (x: any, newEntry?: boolean): x is HealthCheckEntry =>
    isBaseEntry(x, newEntry) &&
    x.type === EntryType.HealthCheck &&
    isHealthCheckRating(x.healthCheckRating);

const isEntry = (x: any, newEntry?: boolean): x is Entry =>
    isHospitalEntry(x, newEntry) ||
    isOccupationalHealthcareEntry(x, newEntry) ||
    isHealthCheckEntry(x, newEntry);

const isValidEntryType = (x: any): x is EntryType => Object.values(EntryType).includes(x);

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

const healthCheckRatingParse = (rating: any): HealthCheckRating => {
    if (!isHealthCheckRating(rating)) {
        throw new Error(`Invalid health rating: ${rating}`);
    }
    return rating;
};

const hospitalEntryParse = (entry: any): HospitalEntry => ({
    ...entry,
    date: dateParse(entry.date),
    discharge: {
        criteria: stringParse(entry.discharge.criteria),
        date: dateParse(entry.discharge.date)
    }
});

const occupationalHealthcareEntryParse = (entry: any): OccupationalHealthcareEntry => ({
    ...entry,
    date: dateParse(entry.date),
    sickLeave: entry.sickLeave
        ? {
              startDate: dateParse(entry.sickLeave.startDate),
              endDate: dateParse(entry.sickLeave.endDate)
          }
        : undefined
});

const healthCheckEntryParse = (entry: any): HealthCheckEntry => ({
    ...entry,
    date: dateParse(entry.date),
    healthCheckRating: healthCheckRatingParse(entry.healthCheckRating)
});

const entryParse = (entry: any, newEntry?: boolean): Entry => {
    if (!isEntry(entry, newEntry)) {
        throw new Error(`Invalid entry: ${entry}`);
    }
    switch (entry.type) {
        case EntryType.Hospital:
            return hospitalEntryParse(entry);
        case EntryType.OccupationalHealthcare:
            return occupationalHealthcareEntryParse(entry);
        case EntryType.HealthCheck:
            return healthCheckEntryParse(entry);
        default:
            return assertNever(entry);
    }
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

export const toNewEntry = (obj: any): NewEntryTemplate => {
    if (!isValidEntryType(obj.type)) {
        throw new Error(`Invalid entry type: ${obj.type}`);
    }
    return entryParse(obj, true);
};

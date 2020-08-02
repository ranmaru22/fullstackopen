import patientData from "../data/patients.json";
import type { CleanedPatientData } from "../types";

const getCleanedPatientData = (): CleanedPatientData[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default { getCleanedPatientData };

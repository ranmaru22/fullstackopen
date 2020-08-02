import diagnosesData from "../data/diagnoses.json";
import type { Diagnosis } from "../types";

const getAllDiagnoses = (): Diagnosis[] => {
    return diagnosesData;
};

export default { getAllDiagnoses };

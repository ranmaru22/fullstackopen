import diagnosesData from "../data/diagnoses.json";
import type { Diagnosis } from "../types";

const getAllDiagnoses = (): Diagnosis[] => {
    return diagnosesData;
};

const getDiagnosisByCode = (code: string): Diagnosis | undefined => {
    return diagnosesData.find(x => x.code === code);
};

export default { getAllDiagnoses, getDiagnosisByCode };

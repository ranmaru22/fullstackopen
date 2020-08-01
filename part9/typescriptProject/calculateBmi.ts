import { calculateBmi } from "./modules/bmi";

if (process.argv.length !== 4) {
    throw Error("Syntax: calculateBmi <height> <weight>");
} else {
    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);
    console.log(calculateBmi(height, weight));
}

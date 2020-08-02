import { calculateExercises } from "./modules/exercises";

if (process.argv.length < 4) {
    throw Error("Syntax: calculateExercises <target> <...hours>");
} else {
    const args = Array.from(process.argv.slice(2)).map(el => Number(el));
    const hours = args.slice(1);
    const target = args[0];
    console.log(calculateExercises(hours, target));
}

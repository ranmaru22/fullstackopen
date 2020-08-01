interface Statistics {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours: number[], target: number): Statistics => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(el => el !== 0).length;
    const average = hours.reduce((acc, v) => acc + v, 0) / periodLength;
    const success = average >= target;
    const rating = success ? 3 : target - average <= 0.25 ? 2 : 1;
    const ratingDescription =
        rating === 3
            ? "Very good, target met!"
            : rating === 2
            ? "Not too bad but could be better."
            : "You need to train harder to meet your goals.";
    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

if (process.argv.length < 4) {
    throw Error("Syntax: calculateExercises <target> <...hours>");
} else {
    const args = Array.from(process.argv.slice(2)).map(el => Number(el));
    const hours = args.slice(1);
    const target = args[0];
    console.log(calculateExercises(hours, target));
}

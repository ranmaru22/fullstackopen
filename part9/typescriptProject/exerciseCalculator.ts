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
        rating === 1
            ? "Very good, target met!"
            : rating === 2
            ? "Not too bad but could be better."
            : "You need to train harder to meet your goals.";
    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

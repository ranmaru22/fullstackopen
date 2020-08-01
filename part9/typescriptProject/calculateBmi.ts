const calculateBmi = (height: number, weight: number): string => {
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    if (bmi <= 15) {
        return "Very severely underweight";
    } else if (bmi <= 16) {
        return "Severely underweight";
    } else if (bmi <= 18.5) {
        return "Underweight";
    } else if (bmi <= 25) {
        return "Normal (healthy weight)";
    } else if (bmi <= 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
};

if (process.argv.length !== 4) {
    throw Error("Syntax: calculateBmi <height> <weight>");
} else {
    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);
    console.log(calculateBmi(height, weight));
}

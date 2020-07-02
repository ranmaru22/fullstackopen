import mongoose from "mongoose";

if (process.argv.length < 3) {
    console.log("Could not connect. Please provide a DB password.");
    process.exit(1);
} else if (process.argv.length === 4 || process.argv.length > 5) {
    console.log(
        "Invalid syntax. Please use mongo.js <PASSWORD> <NAME> <NUMBER>"
    );
    process.exit(1);
}

const dbPasswd = process.argv[2];
const dbUri = `mongodb+srv://foo:${dbPasswd}@playground.mjwok.azure.mongodb.net/fso-phonebook?retryWrites=true&w=majority`;

mongoose.connect(
    dbUri,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("Connected to database.")
);

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});
const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
    Person.find().then(result => {
        console.log("Phonebook:");
        result.forEach(x => console.log(`${x.name} ${x.number}`));
        mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });
    newPerson.save().then(result => {
        console.log("Entry saved.");
        console.log(`${newPerson.name} ${newPerson.number}`);
        mongoose.connection.close();
    });
}

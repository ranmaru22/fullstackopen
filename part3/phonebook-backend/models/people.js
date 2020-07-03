import mongoose from "mongoose";

const dbUri = process.env.MONGODB_URI;

mongoose
    .connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(result => console.log("Connected to MongoDB"))
    .catch(error => console.log("MongoDB connection error", error.message));

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

personSchema.set("toJSON", {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

export default mongoose.model("Person", personSchema);

import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const dbUri = process.env.MONGODB_URI;

mongoose
    .connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(result => console.log("Connected to MongoDB"))
    .catch(error => console.log("MongoDB connection error", error.message));

const personSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, unique: true },
    number: { type: String, required: true, minlength: 8 }
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

export default mongoose.model("Person", personSchema);

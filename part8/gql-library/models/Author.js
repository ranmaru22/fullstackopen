import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    born: { type: Number }
});

AuthorSchema.virtual("books", {
    ref: "Book",
    localField: "_id",
    foreignField: "author"
});

export default mongoose.model("Author", AuthorSchema);

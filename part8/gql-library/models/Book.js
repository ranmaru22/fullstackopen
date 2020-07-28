import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    published: { type: Number },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    genres: [{ type: String }]
});

export default mongoose.model("Book", BookSchema);

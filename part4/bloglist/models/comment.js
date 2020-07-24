import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    text: { type: String, required: true },
    blog: { type: mongoose.Schema.ObjectId, ref: "Blog" },
    user: { type: mongoose.Schema.ObjectId, ref: "User" }
});

commentSchema.set("toJSON", {
    transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});

export default mongoose.model("Comment", commentSchema);

import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    comments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }]
});

blogSchema.set("toJSON", {
    transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});

export default mongoose.model("Blog", blogSchema);

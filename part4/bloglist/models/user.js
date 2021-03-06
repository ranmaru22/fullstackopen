import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 3 },
    name: { type: String, minlength: 3 },
    passwordHash: { type: String, required: true },
    blogs: [{ type: mongoose.Schema.ObjectId, ref: "Blog" }]
});

userSchema.set("toJSON", {
    transform: (_, retObj) => {
        retObj.id = retObj._id.toString();
        delete retObj._id;
        delete retObj.__v;
        delete retObj.passwordHash;
    }
});

userSchema.plugin(uniqueValidator);

export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    passhash: {
        type: String,
        required: true
    },
    favoriteGenre: [String]
});

export default mongoose.model("User", UserSchema);

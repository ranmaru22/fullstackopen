import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

const isValidPassword = password => {
    const passRequirements = [/[0-9]/g, /[A-Z]/g, /[a-z]/g];
    return (
        password.length > 6 && passRequirements.every(x => password.match(x))
    );
};

router.get("/", async (req, res) => {
    const users = await User.find().populate("blogs", "-user").exec();
    res.status(200).json(users);
});

router.post("/", async (req, res) => {
    if (!isValidPassword(req.body.password)) {
        throw Error("password too weak");
    } else {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            username: req.body.username,
            name: req.body.name,
            passwordHash
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    }
});

router.delete("/:id", async (req, res) => {
    const user = await User.findById(req.params.id).exec();
    if (!user) {
        res.status(404).end();
    } else {
        await User.findByIdAndRemove(req.params.id);
        res.status(204).end();
    }
});

export default router;

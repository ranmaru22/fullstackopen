import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const user = await User.findOne({ username: req.body.username }).exec();
    const passwordCorrect =
        user && req.body.password
            ? await bcrypt.compare(req.body.password, user.passwordHash)
            : false;
    if (!user || !passwordCorrect) {
        res.status(400).json({ error: "incorrect username or password" });
    } else {
        const payload = { username: user.username, id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({ username: user.username, token });
    }
});

export default router;
